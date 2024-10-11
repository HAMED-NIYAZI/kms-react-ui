
import {  useEffect, useState } from "react";
import HomePageSettingService from "../../services/HomePageSettingService";
import { connect } from "react-redux";
import { setHomePageSettingsAction } from "../../store/actions/home-page-setting-actions";
import { toast } from "react-toastify";
import './style.css'
interface HomePageSetting {
  id: number;
  imagePath: string;
}

function LogoHomePageSetting({
  homePageSettings,
  setHomePageSetting,
}: {
  homePageSettings: any;
  setHomePageSetting: (item: any) => void;
}) {
  const [logoPath, setLogoPath] = useState<string>("");

  useEffect(() => {
    console.log(homePageSettings);
    // Simulating getting data from local storage
    const storedSetting = localStorage.getItem("homePageSetting");
    if (storedSetting) {
      const setting = JSON.parse(storedSetting) as HomePageSetting;

      setLogoPath(import.meta.env.VITE_APP_BASE_URL+setting.imagePath);

    }
  }, []);

   async function loadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    if (!(target && target.files && target.files[0])) {
      return;
    }

    try {
      let fd = new FormData();

      fd.append("file", target.files[0]);
      fd.append("id",homePageSettings.id );

      const response = await HomePageSettingService.updateLogo(fd);

      if (response.data.result == 0) {
        toast.success(response.data.message);

      } else if (response.data.result == 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {}
  }


  return (
    <div className="row">
      <div className="col-xl-12 col-md-12">
        <div className="card mg-b-20 mg-lg-b-0">
          <div className="card-body p-0">
            <div className="todo-widget-header pb-2 pd-20">
              <h5 className="pt-10 pb-10 d-flex justify-content-center align-items-center">
                لوگو سازمان
              </h5>
              <form>
                <div className="form-group">
                  <div className="bd pd-20 clearfix d-flex justify-content-center align-items-center">



                    <div className="rounded-avatar profile-user">
                    <img
                       src={logoPath}
                      onClick={() => $("#avatar").click()}
                      style={{ height:"100px !important" , width:"100px !important"}}
                    />
                    <a
                      href="#"
                      onClick={() => $("#avatar").click()}
                      className="fas fa-camera profile-edit position-absolute"
                      title=" آپلود لوگوی جدید"
                    ></a>
                    <input
                      type="file"
                      id="avatar"
                      onChange={(e) => loadAvatar(e)}
                      className="d-none"
                    />
                  </div>


                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    homePageSettings: state.homePageSettingState.homePageSetting,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setHomePageSetting: (item: any) =>
      dispatch(setHomePageSettingsAction(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoHomePageSetting);
