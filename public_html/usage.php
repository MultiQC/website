<?php
// Plot PyPI Downloads

// Connect to the database
$dbconfig = parse_ini_file("../config.ini");
$db = new mysqli('localhost', $dbconfig['user'], $dbconfig['password'], $dbconfig['db']);
if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }

// Get the download stats
$dl_stats;
$versions;
$sql = "SELECT `version`, `date` FROM `version_check` ORDER BY `date` ASC";
if(!$result = $db->query($sql)){ die('There was an error running the query [' . $db->error . ']'); }
while($r = $result->fetch_assoc()){
    $t = $r['date'];
    $v = $r['version'];
    if(!isset($versions[$v])){
      $versions[$v] = 1;
    } else {
      $versions[$v] += 1;
    }
    foreach (array_keys($versions) as $k){
      $dl_stats[$t][$k] = $versions[$k];
    }
}

// Create the JSON strings needed by HighCharts
$categories = array_keys($dl_stats);
$series = [];
foreach(array_keys($versions) as $v){
    $data = [];
    foreach($categories as $t){
        $t_dl = isset($dl_stats[$t][$v]) ? intval($dl_stats[$t][$v]) : NULL;
        // Javascript uses milliseconds, so multiply timestamp by 1000
		    array_push($data, array(strtotime($t)*1000, $t_dl));
    }
    array_push($series, array('name' => $v, 'data' => $data));
}
$series_json = json_encode($series);

?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Usage: MultiQC</title>
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
              <li><a href="index.html">Home</a></li>
              <li><a href="docs/">Docs</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Example Reports <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li class="dropdown-header">Analysis Types</li>
                  <li><a href="#">Whole Genome</a></li>
                  <li><a href="examples/rna-seq/multiqc_report.html">RNA-Seq</a></li>
                  <li><a href="examples/bs-seq/multiqc_report.html">Bisulfite</a></li>
                  <li class="dropdown-header">Report Variants</li>
                  <li><a href="#">Many Samples</a></li>
                  <li><a href="#">Directory Names</a></li>
                </ul>
              </li>
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
            <p class="lead">Usage Statistics</p>
          </div>
        </div>
      </div>
    </div>
			
    <div class="container"><div class="content_block">
			<h2>Usage Stats</h2>
			<p>Version check call frequencies.</p>
			<div id="multiqc_version_checks_plot"></div>
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
	<script src="//code.highcharts.com/highcharts.js"></script>
	<script type="text/javascript">
	$(function () {
	  $('#multiqc_version_checks_plot').highcharts({
	    chart: {
	      type: 'area',
        zoomType: 'x'
	    },
	    title: {
	      text: 'MultiQC usage checks over time'
	    },
	    xAxis: {
			  type: 'datetime',
				dateTimeLabelFormats: {
					millisecond: '%e %b %Y, %H:%M',
					second: '%e %b %Y, %H:%M',
					minute: '%e %b %Y, %H:%M',
					hour: '%e %b %Y, %H:%M',
					day: '%e %b %Y',
					week: '%e %b %Y',
					month: '%b \'%y',
					year: '%Y'
	      }
	    },
	    yAxis: {
        min: 0,
	      title: {
	        text: 'Checks'
	      },
        reversedStacks: false
	    },
	    tooltip: {
	      shared: true
	    },
      legend: { reversed: true },
	    plotOptions: {
	      area: {
	        stacking: 'normal',
	        lineColor: '#666666',
	        lineWidth: 1,
	        marker: {
	          lineWidth: 1,
	          lineColor: '#666666'
	        }
	      }
	    },
	    series: <?php echo $series_json; ?>
	  });
	});
</script>
<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-68098153-1', 'auto');
  ga('send', 'pageview');

</script>
	</body>
</html>