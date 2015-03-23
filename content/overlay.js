var CopyThat = {
  init: function(){
    const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                                    .getService(Components.interfaces.nsIClipboardHelper);
    const gPrompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                            .getService(Components.interfaces.nsIPromptService);
    var title = "CopyThat";
    // alert("CopyThat.init is called.");
    var doc = window.content.document;
    var scriptTags = doc.getElementsByTagName("script");
    // alert("scriptTags.length = " + scriptTags.length);
    var found = 0;
    var result = "";
    for (var i = 0; i < scriptTags.length; i++) {
      var srcName = scriptTags[i].getAttribute("src");
      if (srcName != null && ~srcName.indexOf("tracer")) {
        // alert(srcName);
        var splitted = srcName.split("?");
        if (splitted.length > 1) {
          splitted = splitted[1].split("&");
          for (var j = 0; j < splitted.length; j++) {
            var subSplitted = splitted[j].split("=");
            if (subSplitted.length > 1 && subSplitted[0] === "p") {
            // alert("found. " + subSplitted[1]);
              result += subSplitted[1];
              result += "\n";
              found++;
            }
          }
        }
      }
    }
    if (found > 0) {
      gClipboardHelper.copyString(result);
      gPrompts.alert(window, title, "found! " + found + " element(s) copied.");
    } else {
      gPrompts.alert(window, title, "not found.");
    }
  }
};
