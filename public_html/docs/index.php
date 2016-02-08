<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Documentation: MultiQC</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="../images/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png">

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
              <li><a href="../">Home</a></li>
              <li class="active"><a href="#">Docs</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Example Reports <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li class="dropdown-header">Analysis Types</li>
                  <li><a href="#">Whole Genome</a></li>
                  <li><a href="../examples/rna-seq/multiqc_report.html">RNA-Seq</a></li>
                  <li><a href="../examples/bs-seq/multiqc_report.html">Bisulfite</a></li>
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
            <object type="image/svg+xml" title="MultiQC" data="../images/Docs_logo.svg">
              <img src="../images/Docs_logo.png" title="MultiQC">
            </object>
          </div>
          <div class="col-sm-6" style="margin-top:40px;">
            <p class="lead">Welcome to the MultiQC docs.</p>
            <p>These docs are bundled with the MultiQC download for your convenience,
               so you can also read in your installation or on <a href="https://github.com/ewels/MultiQC/tree/master/docs">Github</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
      
    <div class="container docs-container">      
      <?php      
      // Markdown parsing libraries
      require_once('parsedown/Parsedown.php');
      require_once('parsedown-extra/ParsedownExtra.php');
      
      // Get the docs markdown sources in order
      $md = file_get_contents('../../multiqc/docs/README.md');
      $pages = [];
      $section = 'MultiQC Docs';
      // (parse YAML manually as not a core PHP package.. sigh.)
      $md_parts = explode('---', $md, 3);
      if(count($md_parts) == 3){
        $yls = explode(PHP_EOL, $md_parts[1]);
        foreach($yls as $yl){
          $m = trim(str_replace('-', '', $m));
          if(substr($yl, 0, 2) == ' -'){
            $section = $m;
          } else if(substr($yl, 0, 4) == '   -'){
            $pages[$section] = '../../multiqc/docs/'.trim($m);
          }
        }
      }
      if(count($pages) == 0){ $pages[$section] = glob("../../multiqc/docs/*.md"); }
      
      // Loop over the markdown files
      $toc = '<div id="toc"><ul>';
      $content = '';
      foreach ($pages as $section) {
        $sid = strtolower(str_replace(' ', '_', $section));
        $toc .= '<li><a href="'.$sid.'">'.$section.'</a>';
        $content .= '<div class="docs_section" id="'.$sid.'">'.$section.'</div>';
        foreach ($pages[$section] as $fn){
          if(basename($fn) == 'README.md'){ continue; }
          $md = file_get_contents($fn);
          $pd = new ParsedownExtra();
          $toc .= '<li><a href="'.basename($fn).'">'.$section.'</a></li>';
          $content .= '<div class="docs_block" id="'.basename($fn).'">' . $pd->text($md) . '</div>';
        }
        $toc .= '</li>';
        $content .= '</div>';
      }
      $toc .= '</ul></div>';
      
      echo $toc;
      echo $body;
      ?>
      
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


    <!-- Placed at the end of the document so the pages load faster -->
    <script src="../js/jquery-1.11.3.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/highlight.pack.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <script src="../js/docs.js"></script>
  
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
