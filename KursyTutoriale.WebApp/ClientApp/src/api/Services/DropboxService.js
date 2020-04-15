import { Dropbox } from 'dropbox';

// tak wiem nie powinno byc  w hard codzie ale to jest temp
// jesli to tak zostalo tzn ze albo zapomnialem zmienic
// albo nie chcialo mi sie
// na 90% nie chcialo mi sie
const accessToken = 'Zlau4oTAU_AAAAAAAAAAD4-sRbgu01IRKMjCVFLSpUNmtb7xKMtgx-n6l2DNS1WB';
const dbx = new Dropbox({  
  accessToken,  
  fetch  
});

export const GetFiles = () => {
  dbx
    .filesDownload({ path: '/sample/Sample_Video.mp4' })
    .then((response) => {
      return URL.createObjectURL(response.fileBlob);
    });
};

export const CreateFolder = (folderName) => {
  dbx.filesCreateFolderV2({path: `/${folderName}`});
};

export default dbx;
