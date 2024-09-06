import EditInfoHomePageSetting from "./EditInfoHomePageSetting";
import LogoHomePageSetting from "./LogoHomePageSetting";


export default function HomePageSetting() {
 
  return (
<div className="row">
<div className="col-lg-10 col-12">
    {<EditInfoHomePageSetting/> }
    </div>
<div className="col-lg-2 col-12">
    <LogoHomePageSetting/>
    </div>
</div>
  );
}
