<?php
// Plot PyPI Downloads

// Connect to the database
$dbconfig = parse_ini_file("../config.ini");
$db = new mysqli('localhost', $dbconfig['user'], $dbconfig['password'], $dbconfig['db']);
if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }

function _get_week($datestring){
  // SQL groups weeks starting on Sunday. Thanks guys.
  // PHP uses the ISO standard of Monday.
  $year = date("Y", strtotime($datestring));
  $is_sunday = date("w", strtotime($datestring)) == 0;
  $week_number = date("W", strtotime($datestring));
  if($is_sunday) $week_number += 1;
  $week_number = $week_number == 53 ? '01' : $week_number;
  $week_number = sprintf('%02d', $week_number);
  $wstring = $year.'W'.$week_number;
  return ( date("Y-m-d", strtotime($wstring)) );
}

// Usage per week, by version
$releases = array_map('trim', explode("\n", file_get_contents('/home/multiqc/all_versions.txt')));
foreach($releases as $k => $v){
  $releases[$k] = str_replace("v", "", $v);
}
$unrecognised_versions = [];
$releases = array_filter($releases, 'strlen'); // remove empty values
if ($result = $db->query("SELECT `version`, COUNT(*) as `version_count`, `date` from `version_check` GROUP BY `version`, WEEK(`date`) ORDER BY `date` ASC, `version` ASC")) {
    $versions_by_week = [];
    while ($row = $result->fetch_assoc()) {
      $v = str_replace('.dev', '', $row['version']);
      $v = trim(str_replace('dev', '', $v));
      $v = rtrim($v, '.');
      if(!in_array($v, $releases)){
        $unrecognised_versions[$v] += $row['version_count'] / 2; // divide by 2 as we count them again below
        $v = 'unrecognised';
      }
      if(!array_key_exists($v, $versions_by_week)){
        $versions_by_week[$v] = array(
          'x' => [],
          'y' => [],
          'name' => $v,
          'type' => 'bar'
        );
      }
      $monday = _get_week($row['date']);
      $versions_by_week[$v]['x'][] = $monday;
      $versions_by_week[$v]['y'][] = $row['version_count'];
    }
    $result->close();
    // Sort the versions
    ksort($versions_by_week);
    // Remove dodgy looking spike of runs
    $idx = array_search('2016-09-05', $versions_by_week['0.7']['x']);
    unset($versions_by_week['0.7']['x'][$idx]);
    unset($versions_by_week['0.7']['y'][$idx]);
    $versions_by_week['0.7']['x'] = array_values($versions_by_week['0.7']['x']);
    $versions_by_week['0.7']['y'] = array_values($versions_by_week['0.7']['y']);
} else {
  echo '<h1>SQL query failed!</h1>';
  echo '<pre>'.$db->error.'</pre>';
}

// Usage per week, by version, unique IP addresses
if ($result = $db->query("SELECT `version`, COUNT(DISTINCT `ip`) as `version_count`, `date` from `version_check` WHERE `ip` IS NOT NULL GROUP BY `version`, WEEK(`date`) HAVING `version_count` > 0 ORDER BY `date` ASC, `version` ASC")) {
  $versions_by_week_unique = [];
  while ($row = $result->fetch_assoc()) {
    $v = str_replace('.dev', '', $row['version']);
    $v = trim(str_replace('dev', '', $v));
    $v = rtrim($v, '.');
    if(!in_array($v, $releases)){
      $unrecognised_versions[$v] += $row['version_count'] / 2; // divide by 2 as we count them again above
      $v = 'unrecognised';
    }
    if(!array_key_exists($v, $versions_by_week_unique)){
      $versions_by_week_unique[$v] = array(
        'x' => [],
        'y' => [],
        'name' => $v,
        'type' => 'bar'
      );
    }
    $monday = _get_week($row['date']);
    $versions_by_week_unique[$v]['x'][] = $monday;
    $versions_by_week_unique[$v]['y'][] = $row['version_count'];
  }
  $result->close();
  // Sort the versions
  ksort($versions_by_week_unique);
} else {
  echo '<h1>SQL unqiue query failed!</h1>';
  echo '<pre>'.$db->error.'</pre>';
}

// Usage per week, unique and repeat stacked
$unique_data = [];
$repeat_data = [];
foreach($versions_by_week_unique as $v => $d){
  foreach($d['x'] as $idx => $date){
    $unique_data[$date] += $d['y'][$idx];
  }
}
foreach($versions_by_week as $v => $d){
  foreach($d['x'] as $idx => $date){
    if(array_key_exists($date, $unique_data)){
      $repeat_data[$date] += $d['y'][$idx];
    }
  }
}
$unique_repeat_by_week = array(
  'unique' => array('name' => 'Unique', 'type' => 'bar', 'marker' => array('color' => '#434348'), 'x' => [], 'y' => []),
  'repeat' => array('name' => 'Repeat', 'type' => 'bar', 'marker' => array('color' => '#7CB5EC'), 'x' => [], 'y' => [])
);
foreach($unique_data as $date => $count){
  $unique_repeat_by_week['unique']['x'][] = $date;
  $unique_repeat_by_week['unique']['y'][] = $count;
}
foreach($repeat_data as $date => $count){
  $unique_repeat_by_week['repeat']['x'][] = $date;
  $unique_repeat_by_week['repeat']['y'][] = $count;
}


// Usage per hour, past month
$usage_per_hour = array('hits' => array('name' => 'Unique', 'type' => 'bar', 'x' => [], 'y' => []));
if ($result = $db->query("SELECT COUNT(*) as `count`, HOUR(`date`) as `h`, DATE(`date`) as `d`
  from `version_check`
  WHERE `date` BETWEEN (CURRENT_DATE() - INTERVAL 2 WEEK) AND now()
  GROUP BY `h`, `d`
  ORDER BY `date` ASC")) {
  while ($row = $result->fetch_assoc()) {
    $usage_per_hour['hits']['x'][] = $row['d'].' '.$row['h'].':00:00';
    $usage_per_hour['hits']['y'][] = $row['count'];
  }
} else {
  echo '<h1>SQL query failed!</h1>';
  echo '<pre>'.$db->error.'</pre>';
}

?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Version Check Stats: MultiQC</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">

    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../fonts/font-mfizz.css">
    <link rel="stylesheet" href="../css/code_highlighting/github.css">
    <link rel="stylesheet" href="../css/styles.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body id="mqc_docs">

    <div class="header">

      <!-- Static navbar -->
      <nav class="navbar navbar-default navbar-inverse navbar-static-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand visible-xs" href="#">MultiQC</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="index.php">Home</a></li>
              <li><a href="docs/">Docs</a></li>
              <li><a href="https://www.github.com/ewels/MultiQC">GitHub</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <h1>
              <object type="image/svg+xml" title="MultiQC" data="images/MultiQC_logo.svg">
						    <img src="images/MultiQC_logo.png">
					    </object>
            </h1>
          </div>
          <div class="col-sm-6" style="margin-top:40px;">
            <p class="lead">Version Check Statistics</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content_block">
  			<h2>MultiQC Version Call Stats</h2>
        <p>When MultiQC runs, it checks <code>multiqc.info</code> for the latest released version so that it can issue a warning if the software is out of date.
          The website records the date of each check, along with the version of MultiQC that was running. This allows us to roughly plot usage.</p>
  			<p>Note that numbers should be taken with a large pinch of suspicion. For example, the check from MultiQC in Python 2.7 call probably only works after the v1.1 release.
        Also people can opt-out of the check and may be running offline.</p>
        <p>A spike of over thirteen thousand v0.7 runs in one week (2016-09-05) has been removed to improve visualisation.</p>
        <p>Development versions merged into main release numbers for plot. <em>eg.</em> <code>v1.1dev</code> shows as <code>1.1</code>.</p>
        <div id="versions_by_week" style="height:450px;"></div>

        <h2>Unique Visitor Checks</h2>
        <p>This plot counts unique IP addresses for each week, so people repeatedly running MultiQC within a week are counted only once.
          This gives an idea of how many different people are running MultiQC.</p>
        <p>Note that we only recorded IP addresses from July 2017.</p>
        <div id="versions_by_week_unique" style="height:450px;"></div>

        <h2>Visitor Checks: Repeat versus unique.</h2>
        <p>This plot shows the same data as above, but instead of highlighting versions, it shows the proportion of runs by different users per week.</p>
        <p>Note that we only recorded IP addresses from July 2017.</p>
        <div id="hits_by_week_unique" style="height:450px;"></div>

        <h2>Visitor Checks Per Hour</h2>
        <div id="hits_per_hour" style="height:450px;"></div>

        <h2>Unrecognised version numbers</h2>
        <p>List of MultiQC version numbers that don't match a known release after cleanup. Associated value is the
          count of how many times that was seen.</p>
        <pre><?php arsort($unrecognised_versions); print_r($unrecognised_versions); ?></pre>

      </div>
    </div>


    </div> <!-- /container -->

    <footer id="footer">
      <div class="container">
        <p>Created by Phil Ewels:
          <a target="_blank" href="https://github.com/ewels"><i class="fa fa-github"></i> ewels</a> |
          <a target="_blank" href="https://twitter.com/tallphil"><i class="fa fa-twitter"></i> tallphil</a> |
          <a target="_blank" href="https://se.linkedin.com/in/philewels">LinkedIn</a> |
          <a target="_blank" href="https://www.researchgate.net/profile/Philip_Ewels">ResearchGate</a>
        </p>
        <a target="_blank" href="http://www.scilifelab.se" class="scilife-footer">
          <img src="../images/SLL_logo_blue_white.png">
        </a>
      </div>
    </footer>

	<!-- Scripts -->
	<script src="js/jquery-1.11.3.min.js"></script>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-68098153-1', 'auto');
    ga('send', 'pageview');

    // Plotly - hits (versions)
    Plotly.newPlot(
      'versions_by_week',
      <?php echo json_encode(array_values($versions_by_week)); ?>,
      {
        title: 'MultiQC: Version checks per week',
        barmode: 'stack',
        // bargap: 0,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        yaxis: { gridcolor: '#dedede' }
      }
    );

    // Plotly - unique (versions)
    Plotly.newPlot(
      'versions_by_week_unique',
      <?php echo json_encode(array_values($versions_by_week_unique)); ?>,
      {
        title: 'MultiQC: Version checks per week (unique IPs)',
        barmode: 'stack',
        // bargap: 0,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        yaxis: { gridcolor: '#dedede' }
      }
    );

    // Plotly - hits (unqiue / repeat)
    Plotly.newPlot(
      'hits_by_week_unique',
      <?php echo json_encode(array_values($unique_repeat_by_week)); ?>,
      {
        title: 'MultiQC: Version checks per week (unique vs all)',
        barmode: 'stack',
        // bargap: 0,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        yaxis: { gridcolor: '#dedede' }
      }
    );

    // Plotly - hits per hour
    Plotly.newPlot(
      'hits_per_hour',
      <?php echo json_encode(array_values($usage_per_hour)); ?>,
      {
        title: 'MultiQC: Version checks per hour (last two weeks)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        yaxis: { gridcolor: '#dedede' }
      }
    );

  </script>
	</body>
</html>
