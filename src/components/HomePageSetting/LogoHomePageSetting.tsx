import { useEffect, useRef, useState } from "react";


interface HomePageSetting {
  id: number;
  imagePath: string;
}

const LogoSelector: React.FC = () => {
  const [logoPath, setLogoPath] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulating getting data from local storage
    const storedSetting = localStorage.getItem('homePageSetting');
    if (storedSetting) {
      const setting = JSON.parse(storedSetting) as HomePageSetting;
      setLogoPath(`${process.env.REACT_APP_BASE_URL}${setting.imagePath}`);
    }
  }, []);

  const selectAvatar = () => {
    logoInputRef.current?.click();
  };

  const updateLogo = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("id", localStorage.getItem('homePageSettingId') || '');
    formData.append("imagePath", '');
    formData.append("file", selectedFile);

    try {
      const response = await axios.post('/api/update-logo', formData);
      console.log(response.data);
      
      if (response.data.result === 0) {
        alert(response.data.message);
        // Update local storage
        localStorage.setItem('homePageSetting', JSON.stringify(response.data.data));
        // Update logo path state
        setLogoPath(`${process.env.REACT_APP_BASE_URL}${response.data.data.imagePath}`);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the logo.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
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
                        style={{ cursor: 'pointer' }}
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
};

export default LogoSelector;


// import { toast } from "react-toastify";
// import HomePageSettingService from "../../services/HomePageSettingService";

// import "./style.css";

 

// export default function LogoHomePageSetting() {

//   function handleAvatarSelected () {
//      $("#logo").click();
//   }
  
//   async function UpdateLogo(e: React.ChangeEvent<HTMLInputElement>) {
//        const target = e.target;
//       console.log('target:   ',target);
    
//       if (target && target.files) {
//         logo.value = target.files[0];
      
//       }
    
//       if (!logo.value) {
//         return false;
//       }
    
//       try {
//         let fd = new FormData();
//         fd.append("id", localStorageService.getHomePageSetting.id);
//         fd.append("imagePath",'');
//         fd.append("file", logo.value);
     
//         const response = await HomePageSettingService.updateLogo(fd);
//         console.log('response:   ',response);
    
//         if (response.data.result == 0) {
//           toast.success(response.data.message);
    
//           localStorageService.setHomePageSetting(response.data.data);
//         } else if (response.data.result == 5) {
//           toast.warning(response.data.message);
//         } else {
//           toast.warning(response.data.message);
//         }
//       } catch (err) {
    
//         console.log('err:   ',err);
    
//       }
    
//     }

//     return (
//         <div className="row">
//         <div className="col-xl-12 col-md-12">
//           <div className="card mg-b-20 mg-lg-b-0">
//             <div className="card-body p-0">
//               <div className="todo-widget-header pb-2 pd-20">
//                 <h5
//                   style={{
//                     paddingTop:"10px",
//                     paddingBottom: "10px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center"}}               
//                 >
//                   لوگو سازمان
//                 </h5>
//                 <form>
//                   <div className="form-group">
//                     <div
//                       className="bd pd-20 clearfix"
//                       style={{        display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center"}}
                
                      
//                     >
//                       <div className="main-img-user profile-user">
//                         {/* <img :src="logoPath" /> */}
//                         <a
//                           className="fas fa-camera profile-edit"
//                           style= {{cursor: "pointer"}}
//                           title=" آپلود لوگوی جدید"
//                           // @click.prevent="selectAvatar($event)"
//                           onClick={handleAvatarSelected}
//                          ></a>
//                         <input
//                           type="file"
//                           ref="logo"
//                           // @change="UpdateLogo($event)"
//                           id="logo"
//                           className="d-none"
//                           onChange={UpdateLogo}
//                         />
//                       </div>
//                     </div>
//                     </div>
//                  </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

  
  
