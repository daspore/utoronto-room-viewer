<?php
	// pass in bldg, room, and date (in YYYMMDD format); If date is null, room info including
	// capacity is returned. If date is non-null, bookings near that date are returned.

	header('Content-type: application/json');
	$tld = "http://www.osm.utoronto.ca";

	$room_data = array();

	function arr_get($array, $key, $default = null){
	    return isset($array[$key]) ? $array[$key] : $default;
	}

	$bldg = arr_get($_GET, 'bldg', null);
	$room = arr_get($_GET, 'room', null);
	$date = arr_get($_GET, 'date', null);
	if ($bldg == null) {
		echo json_encode(array('status' => 'error', 'error' => 'No building specified'));
		exit();
	}
	if ($room == null) {
		echo json_encode(array('status' => 'error', 'error' => 'No room specified'));
		exit();
	}

	if ($date == null) {
		$info_url = "http://www.osm.utoronto.ca/booking_request/f?p=210:1:::::P1_BLDG,P1_ROOM:$bldg,$room";
		// get the room info
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $info_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		$roominfo_html = curl_exec($ch);
		curl_close($ch);


		$dom = new DOMDocument;
		@$dom->loadHTML($roominfo_html);
		$xpath = new DOMXpath($dom);

		// extract useful data
		
		// the picture
		$elms = $xpath->query('(//div[@id="columnright"]//table[2]//td[@headers="PHOTO"]//img)[1]');
		$room_data['photo'] = $tld . $elms[0]->getAttribute('src');

		// the capacity and types
		$elms = $xpath->query('//div[@id="columnright"]/div[1]')[0];
		foreach ($elms->getElementsByTagName('tr') as $child) {
			$cells = $child->getElementsByTagName('td');
			if ($cells->length == 2) {
				switch ($cells[0]->textContent) {
				case "Capacity":
					$room_data['capacity'] = intval($cells[1]->textContent);
					break;
				case "Teaching station":
					$room_data['teaching_station'] = $cells[1]->textContent == "Y" ? true : false;
				case "Teaching station Junior":
					$room_data['teaching_station_junior'] = $cells[1]->textContent == "Y" ? true : false;

				}
			}
		}



		echo json_encode($room_data);
		exit();
	}
	// now grab scheduling data
	$info_url = "http://www.osm.utoronto.ca/booking_request/f?p=200:3:::NO::P3_BLDG,P3_ROOM,P3_CALENDAR_DATE:$bldg,$room,$date";
	// get the room info
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $info_url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	$roominfo_html = curl_exec($ch);
	curl_close($ch);


	$dom = new DOMDocument;
	@$dom->loadHTML($roominfo_html);
	$xpath = new DOMXpath($dom);

	$date_elms = $xpath->query('//div[@id="apex_cal_data_grid_src"]/../input[1]');

	$bookings = array();
	for ($i = 0; $i < $date_elms->length; $i++) {
		$booking_time = $date_elms[$i]->getAttribute('value');
		$elm = $xpath->query('../div[@id="apex_cal_data_grid_src"]', $date_elms[$i]);
		$booking_details = trim($elm[0]->textContent);
		$bookings[] = array("time" => $booking_time, "desc" => $booking_details, "id" => "$bldg $room $booking_time");
	}
	$room_data['bookings'] = $bookings;

	echo json_encode($room_data);
?> 
