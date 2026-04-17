
import configData from './data/site-config.json';
import Hero_03 from './components/Hero/hero_03';
import Feature_02 from './components/Features/feature_02';
import Gallery_01 from './components/Gallery/gallery_01';
import Cta_01 from './components/CTA/cta_01';
import Footer_01 from './components/Footer/footer_01';


export default function App() {
  console.log(configData);
  
  return (
    <div className="w-full max-w-[1300px] mx-auto">
      <Hero_03 config={configData} />
      <Feature_02 config={configData} />
      <Gallery_01 config={configData} />
      <Cta_01 config={configData} />
      <Footer_01 config={configData} />

    </div>
  );
}
