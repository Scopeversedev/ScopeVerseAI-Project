import fs, { readFileSync } from 'fs';
import path from 'path';

export const getResetPasswordHtml = (url) => {
  let file = readFileSync('./utils/reset_password.html',{encoding: 'utf-8'});
  file = file.replace('{{reset_password_link}}',url);
  return file
}
export const getPrayHtml = (name,subject,message,email) => {
  let file = readFileSync('./utils/pray.html',{encoding: 'utf-8'});
  file = file.replaceAll('{{name}}',name);
  file = file.replaceAll('{{subject}}',subject);
  file = file.replaceAll('{{message}}',message);
  file = file.replaceAll('{{email}}',email);
  return file
}
