import configData from './data/site-config.json';
import Hero_01 from './components/Hero/hero_01';
import Feature_01 from './components/Features/feature_01';
import Gallery_01 from './components/Gallery/gallery_01';
import Cta_01 from './components/CTA/cta_01';
import Footer_01 from './components/Footer/footer_01';


export default function App() {
  console.log(configData);
  
  return (
    <div className="w-full max-w-[1300px] mx-auto">
      <Hero_01 config={configData} />
      <Feature_01 config={configData} />
      <Gallery_01 config={configData} />
      <Cta_01 config={configData} />
      <Footer_01 config={configData} />

    </div>
  );
}