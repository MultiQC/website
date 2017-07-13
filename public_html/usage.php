<?php
// Plot PyPI Downloads

// Connect to the database
$dbconfig = parse_ini_file("../config.ini");
$db = new mysqli('localhost', $dbconfig['user'], $dbconfig['password'], $dbconfig['db']);
if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }

// Usage per week, by version
if ($result = $db->query("SELECT `version`, COUNT(*) as `version_count`, `date` from `version_check` GROUP BY `version`, WEEK(`date`) ORDER BY `date` ASC, `version` ASC")) {
    $versions_by_week = [];
    $weeks = [];
    while ($row = $result->fetch_assoc()) {
      $v = str_replace('.dev', '', $row['version']);
      if(!array_key_exists($v, $versions_by_week)){
        $versions_by_week[$v] = array(
          'x' => [],
          'y' => [],
          'name' => $v,
          'type' => 'bar'
        );
      }
      $monday = date("Y-m-d", strtotime('last monday', strtotime($row['date'])));
      $versions_by_week[$v]['x'][] = $monday;
      $versions_by_week[$v]['y'][] = $row['version_count'];
      if(!in_array($monday, $weeks)){
        $weeks[] = $monday;
      }
    }
    $result->close();
    // Sort the versions
    ksort($versions_by_week);
    // Remove dodgy looking spike of runs
    $idx = array_search('2016-08-29', $versions_by_week['0.7']['x']);
    unset($versions_by_week['0.7']['x'][$idx]);
    unset($versions_by_week['0.7']['y'][$idx]);
    $versions_by_week['0.7']['x'] = array_values($versions_by_week['0.7']['x']);
    $versions_by_week['0.7']['y'] = array_values($versions_by_week['0.7']['y']);
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
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

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

    <div class="container"><div class="content_block">
			<h2>MultiQC Version Call Stats</h2>
      <p>When MultiQC runs, it checks <code>multiqc.info</code> for the latest released version so that it can issue a warning if the software is out of date.
        The website records the date of each check, along with the version of MultiQC that was running. This allows us to roughly plot usage.</p>
			<p>Note that numbers should be taken with a large pinch of suspicion. For example, the check from MultiQC in Python 2.7 call probably only works after the v1.1 release.
      Also people can opt-out of the check and may be running offline.</p>
      <p>A spike of over thirteen thousand v0.7 runs in one week (2016-08-29) has been removed to improve visualisation.</p>
      <p>Development versions merged into main release numbers for plot. <em>eg.</em> <code>v1.1dev</code> shows as <code>1.1</code>.</p>
      <div id="versions_by_week" style="height:450px;"></div>
    </div></div>


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

    // Plotly
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

  </script>
	</body>
</html>