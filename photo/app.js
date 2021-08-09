const path = require("path");
const os = require("os");
const fs = require("fs");

const folder = process.argv[2];
const workingDir = path.join(os.homedir(), "Pictures", folder);
if(!folder || !fs.existsSync(workingDir)) {
  console.error("폴더 이름을 입력해주세여");
  return;
}

const videoDir = path.join(workingDir, "videoDir");
const capturedDir = path.join(workingDir, "capturedDir");
const duplicatedDir = path.join(workingDir, "duplicatedDir");

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

fs.promises.readdir(workingDir)
  .then(processFiles)
  .catch(console.log)

  function processFiles(files) {
    files.forEach((file) => {
      if (isVideoFile(file)) {
        move(file, videoDir);
      } else if (isCaptured(file)) {
        move(file, capturedDir);
      } else if (isDuplicated(files, file)) {
        move(file, duplicatedDir);
      }
    })
  }

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
}
function isCaptured(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}
function isDuplicated(files, file) {
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }

  const edited = `IMG_E${file.split("_")[1]}`;
  const found = files.find(f => f.includes(edited));
  return !!found;
}

function move(file, targetDir) {
  const oldPath = path.join(workingDir,file);
  const newPath = path.join(targetDir,file);
  fs.promises.rename(oldPath, newPath)
  .catch(console.error)
}