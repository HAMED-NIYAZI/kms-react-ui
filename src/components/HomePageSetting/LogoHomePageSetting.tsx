import {  useEffect, useRef, useState } from "react";
import HomePageSettingService from "../../services/HomePageSettingService";
import { connect } from "react-redux";
import { setHomePageSettingsAction } from "../../store/actions/home-page-setting-actions";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(homePageSettings);
    // Simulating getting data from local storage
    const storedSetting = localStorage.getItem("homePageSetting");
    if (storedSetting) {
      const setting = JSON.parse(storedSetting) as HomePageSetting;
      setLogoPath(import.meta.env.VITE_APP_BASE_URL+setting.imagePath);
    }
  }, []);

  const selectAvatar = () => {
    logoInputRef.current?.click();
  };

  const updateLogo = async () => {
    if (!selectedFile) return;
 console.log('homePageSettings:',homePageSettings.id);
    const formData = new FormData();
    formData.append("id", homePageSettings.id); //todo
    formData.append("imagePath", "");
    formData.append("file", selectedFile);
    console.log(formData);

    try {
      const response = await HomePageSettingService.updateLogo(formData);
      console.log(response.data);

      if (response.data.result === 0) {
        alert(response.data.message);
        // Update local storage
        setHomePageSetting(response.data.data);
        // Update logo path state
        setLogoPath(import.meta.env.VITE_APP_BASE_URL+response.data.data.imagePath);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the logo.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      updateLogo();
    }
  };

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
                    <div className="main-img-user profile-user position-relative">
                      <img src={logoPath} alt="Current Logo" />
                      <button
                        type="button"
                        className="fas fa-camera profile-edit position-absolute"
                        style={{ cursor: "pointer" }}
                        title=" آپلود لوگوی جدید"
                        onClick={selectAvatar}
                      >
                        {/* Camera icon */}
                      </button>
                      <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleFileChange}
                        id="logo"
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
