import React, { useState } from 'react';

import {
  Button,
  GitHubIcon,
} from 'website-components';

import Seo from '../components/Seo';
import Tabs from '../components/Tabs';
import YoutubeIframe from '../components/YoutubeIframe';

const HomePage = ({ location }) => {
  const [videoLanguage, setVideoLanguage] = useState('en');
  const [videoEng, setVideoEng] = useState(0);
  const [videoEsp, setVideoEsp] = useState(0);

  return (
    <>
      <Seo
        title="MultiQC"
      />
      <div className="relative bg-gray-800 text-white py-16 md:py-24">
        <div className="container-lg">
          <div className="row">
            <div className="col-full lg:col-8">
              <h1 className="typo-h4 mb-4">
                Aggregate results from bioinformatics analyses across many samples into a single report
              </h1>
              <p className="typo-blockquote">
                MultiQC searches a given directory for analysis logs and compiles a HTML report. It's a general use
                tool, perfect for summarising the output from numerous bioinformatics tools.
              </p>
              <div className="row mt-8">
                <div className="col-full lg:col-6 hidden lg:block">
                  {videoLanguage === 'en' && (
                    <>
                      {videoEng === 0 && (
                        <YoutubeIframe id="BbScv9TcaMg" />
                      )}
                      {videoEng === 1 && (
                        <YoutubeIframe id="Gg5neIPuiVo" />
                      )}
                      {videoEng === 2 && (
                        <YoutubeIframe id="cktKbESOOno" />
                      )}
                      {videoEng === 3 && (
                        <YoutubeIframe id="qPbIlO_KWN0" />
                      )}
                    </>
                  )}
                  {videoLanguage === 'es' && (
                    <>
                      {videoEsp === 0 && (
                        <YoutubeIframe id="WX_qVhJ32g0" />
                      )}
                      {videoEsp === 1 && (
                        <YoutubeIframe id="E_NJCxwXAGQ" />
                      )}
                      {videoEsp === 2 && (
                        <YoutubeIframe id="0MfW7Y8Ocak" />
                      )}
                    </>
                  )}
                </div>
                <div className="col-full lg:col-6">
                  <Tabs current={videoLanguage} setCurrent={setVideoLanguage}>
                    <Tabs.Item index="en">
                      English 🇬🇧
                    </Tabs.Item>
                    <Tabs.Item index="es">
                      Español 🇪🇸
                    </Tabs.Item>
                  </Tabs>
                  <div className="mt-4">
                    {videoLanguage === 'en' && (
                      <Tabs current={videoEng} setCurrent={setVideoEng} vertical>
                        <Tabs.Item index={0}>
                          Introduction to MultiQC (1:19)
                        </Tabs.Item>
                        <Tabs.Item index={1}>
                          Installing MultiQC (4:33)
                        </Tabs.Item>
                        <Tabs.Item index={2}>
                          Running MultiQC (5:21)
                        </Tabs.Item>
                        <Tabs.Item index={3}>
                          Using MultiQC Reports (6:06)
                        </Tabs.Item>
                      </Tabs>
                    )}
                    {videoLanguage === 'es' && (
                      <Tabs current={videoEsp} setCurrent={setVideoEsp} vertical>
                        <Tabs.Item index={0}>
                          Introducción a MultiQC (1:43)
                        </Tabs.Item>
                        <Tabs.Item index={1}>
                          Instalación de MultiQC (4:19)
                        </Tabs.Item>
                        <Tabs.Item index={2}>
                          ¿Cómo ejecutar MultiQC? (5:53)
                        </Tabs.Item>
                      </Tabs>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-full lg:col-4 mt-4 lg:mt-0">
              <Button to="https://www.github.com/ewels/MultiQC" variant="primary" size="md" className="w-full">
                <GitHubIcon className="h-6 w-6 mr-4" />
                GitHub
              </Button>
              <div className="mt-4">
                <Button to="https://pypi.org/project/multiqc/" variant="primary" size="md" className="w-full">
                  Python Package Index
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/docs/" variant="primary" size="md" className="w-full">
                  Documentation
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#supported-tools" variant="primary" size="md" className="w-full">
                  114 supported tools
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#publication" variant="primary" size="md" className="w-full">
                  Publication / citation
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#publication" variant="primary" size="md" className="w-full">
                  Get help on Gitter
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#publication" variant="primary" size="md" className="w-full">
                  Quick install
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
