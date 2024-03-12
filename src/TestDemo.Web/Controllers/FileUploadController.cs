using Abp.Runtime.Session;
using Abp.UI;
using Abp.Web.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using Hangfire.Annotations;

namespace TestDemo.Web.Controllers
{
    public class FileUploadController : Controller
    {
        [HttpPost]
        public JsonResult UploadSensorAttachments()
        {
            try
            {
                if (Request.Files.Count <= 0 || Request.Files[0] == null)
                {
                    throw new UserFriendlyException("");
                }
                var files = Request.Files[0];

                var acceptedFormates = new List<string> { ".pdf", ".jpg", ".jpeg", ".doc", ".docx", ".txt", ".xls", ".xlxs" };
                var fileExt = System.IO.Path.GetExtension(files.FileName).Substring(1);
                var fileInfo = new FileInfo(files.FileName);
                if (!acceptedFormates.Contains(fileExt.ToLower()))
                {
                    // throw new UserFriendlyException("DocumentsFill");
                }
                string tempFileName = "";
                tempFileName = Path.GetFileNameWithoutExtension(files.FileName) + fileInfo.Extension;
                if (!Directory.Exists(Path.Combine(Server.MapPath("~/UserFiles/Sensors/"))))
                {
                    Directory.CreateDirectory(Path.Combine(Server.MapPath("~/UserFiles/Sensors/")));
                }
                var ServerSavePath = Path.Combine(Server.MapPath("~/UserFiles/Sensors/") + tempFileName);
                files.SaveAs(ServerSavePath);

                return Json(new AjaxResponse(new
                {
                    fileName = tempFileName,
                    path = ""
                }));

            }
            catch (UserFriendlyException ex)
            {
                return Json(new AjaxResponse(new ErrorInfo(ex.Message)));
            }
        }

        [HttpGet]
        public ActionResult EditFile(string fileName)
        {
            var filePath = Server.MapPath("~/UserFiles/Sensors/") + fileName;

            if (!System.IO.File.Exists(filePath))
            {
                return HttpNotFound();
            }

            return View(filePath);
        }

        [HttpPost]
        public ActionResult EditFile(string fileName, FormCollection formCollection)
        {
            // Handle editing here
            return RedirectToAction("Index"); // Redirect to appropriate action after editing
        }
    }
}
