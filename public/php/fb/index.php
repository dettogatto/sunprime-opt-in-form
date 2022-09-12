<?php


if($_SERVER["REQUEST_METHOD"] == "POST"){ // Send data

  $token = "your-token";
  $pixel_id = "your-pixel-id";
  $url = 'https://graph.facebook.com/v13.0/' . $pixel_id . '/events?access_token=' . $token;

  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $user_data = [
    "client_user_agent" => $_SERVER['HTTP_USER_AGENT'],
    "client_ip_address" => $_SERVER['REMOTE_ADDR']
  ];

  // $data = [
  //   "event" => "Test"
  // ];

  $ev = isset($data["event"]) ? $data["event"] : null;
  if(!$ev || $ev == ""){
    echo('I need event name in event param');
    die();
  }

  $email = isset($data["email"]) ? $data["email"] : null;
  if($email && strlen($email) >= 5){
    $email = hash('sha256', $email);
    $user_data["em"] = [$email];
  }

  $phone = isset($data["phone"]) ? $data["phone"] : null;
  if($phone && strlen($phone) >= 5){
    $phone = hash('sha256', $phone);
    $user_data["ph"] = [$phone];
  }

  $action_source = "website";
  if(isset($data["source"])){
    $action_source = $data["source"];
  }


  $body = [
    // "test_event_code" => "TEST17905",
    "data" => [
      [
        "event_name" => $ev,
        "event_time" => time(),
        "action_source" => $action_source,
        "user_data" => $user_data
      ]
    ]
  ];


  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json'));
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
  $server_output = curl_exec($ch);
  $data = json_decode($server_output);
  echo(json_encode($data));

}
