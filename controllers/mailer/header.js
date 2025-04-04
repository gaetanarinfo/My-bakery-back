/*
 * Controller
 *************/
module.exports = {

  set: () => {

    var html = `<!DOCTYPE HTML
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">

            <head>
            <!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>

            <style type="text/css">
                @media only screen and (min-width: 620px) {
                .u-row {
                    width: 600px !important;
                }

                .u-row .u-col {
                    vertical-align: top;
                }


                .u-row .u-col-33p33 {
                    width: 199.98px !important;
                }


                .u-row .u-col-50 {
                    width: 300px !important;
                }


                .u-row .u-col-66p67 {
                    width: 400.02px !important;
                }


                .u-row .u-col-100 {
                    width: 600px !important;
                }

                }

                @media only screen and (max-width: 620px) {
                .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }

                .u-row {
                    width: 100% !important;
                }

                .u-row .u-col {
                    display: block !important;
                    width: 100% !important;
                    min-width: 320px !important;
                    max-width: 100% !important;
                }

                .u-row .u-col>div {
                    margin: 0 auto;
                }


                .u-row .u-col img {
                    max-width: 100% !important;
                }

                }

                body {
                margin: 0;
                padding: 0
                }

                table,
                td,
                tr {
                border-collapse: collapse;
                vertical-align: top
                }

                .ie-container table,
                .mso-container table {
                table-layout: fixed
                }

                * {
                line-height: inherit
                }

                a[x-apple-data-detectors=true] {
                color: inherit !important;
                text-decoration: none !important
                }


                table,
                td {
                color: #000000;
                }

                @media (max-width: 480px) {
                #u_content_heading_10 .v-font-size {
                    font-size: 30px !important;
                }

                #u_content_text_5 .v-container-padding-padding {
                    padding: 10px !important;
                }

                #u_content_button_1 .v-size-width {
                    width: 65% !important;
                }

                #u_content_heading_2 .v-container-padding-padding {
                    padding: 40px 20px 20px !important;
                }

                #u_content_heading_2 .v-font-size {
                    font-size: 25px !important;
                }

                #u_row_3.v-row-padding--vertical {
                    padding-top: 0px !important;
                    padding-bottom: 0px !important;
                }

                #u_content_image_2 .v-container-padding-padding {
                    padding: 30px 10px 10px !important;
                }

                #u_content_image_2 .v-src-width {
                    width: 100% !important;
                }

                #u_content_image_2 .v-src-max-width {
                    max-width: 28% !important;
                }

                #u_content_text_4 .v-container-padding-padding {
                    padding: 10px 10px 30px !important;
                }

                #u_content_button_2 .v-size-width {
                    width: 65% !important;
                }

                #u_content_button_2 .v-container-padding-padding {
                    padding: 20px 10px 40px !important;
                }

                #u_content_button_5 .v-size-width {
                    width: 65% !important;
                }

                #u_content_button_5 .v-container-padding-padding {
                    padding: 20px 10px 40px !important;
                }

                #u_content_heading_5 .v-container-padding-padding {
                    padding: 40px 10px 0px !important;
                }

                #u_content_heading_5 .v-font-size {
                    font-size: 27px !important;
                }

                #u_content_text_7 .v-container-padding-padding {
                    padding: 10px 10px 20px !important;
                }

                #u_content_button_3 .v-size-width {
                    width: 65% !important;
                }

                #u_content_button_3 .v-container-padding-padding {
                    padding: 20px 10px 40px !important;
                }

                #u_content_heading_7 .v-container-padding-padding {
                    padding: 40px 20px 20px !important;
                }

                #u_content_heading_7 .v-font-size {
                    font-size: 25px !important;
                }

                #u_content_social_1 .v-container-padding-padding {
                    padding: 40px 10px 10px !important;
                }

                #u_content_text_8 .v-container-padding-padding {
                    padding: 10px 10px 20px !important;
                }
                }

                .u-row .u-col.u-col-50:first-child {
                margin-right: 2rem;
                }

                @media all and (max-width: 768px) {

                .u-row div:first-child {
                    display: table !important;
                }

                .u-row .u-col.u-col-50:first-child {
                    margin-right: 0;
                }
                }

                .content::before {
                color: #8b7a7a;
                content: "\f061";
                font: normal normal normal 20px / 1 FontAwesome;
                font-size: 14px;
                left: -16px;
                position: relative;
                }

                #m_-814258896841190503u_content_image_2 {
                  position: relative;
                }

                #m_-814258896841190503u_content_text_4 {
                 font-family:'Raleway',sans-serif;background: #f7f7f7;position: absolute;bottom: 285px;left: 0;width: calc(100% - 40px);height: auto;
                }
            </style>

            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css2?family=Federo&display=swap" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap" rel="stylesheet"
                type="text/css"><!--<![endif]-->

            <script src=https://kit.fontawesome.com/6650c3fdcf.js crossorigin=anonymous></script>

            </head>
            <body class="clean-body u_body"
  style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body"
    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%"
    cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->



          <!--[if gte mso 9]>
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
        <tr>
          <td background="https://cdn.templates.unlayer.com/assets/1715758294520-header.png" valign="top" width="100%">
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
        <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1715758294520-header.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
      <![endif]-->

          <div class="u-row-container v-row-padding--vertical"
            style="padding: 30px 0px;background-image: url('https://my-bakery.fr/background-web-mail.png');background-repeat: no-repeat;background-position: left top;background-color: #0d0b03">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 30px 0px;background-image: url('https://my-bakery.fr/image-10.png');background-repeat: no-repeat;background-position: left top;background-color: #0d0b03;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-33p33"
                  style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->

                      <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                        cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:90px 10px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                    <a href="https://my-bakery.fr/" target="_blank"
                                      style="color: rgb(0, 0, 238); text-decoration: underline; line-height: inherit;"><img
                                        align="center" border="0" src="https://my-bakery.fr/logo-dark.png" alt=""
                                        title=""
                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 78%;max-width: 140.4px;"
                                        width="140.4" class="v-src-width v-src-max-width" />
                                    </a>
                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div><!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-66p67"
                  style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table id="u_content_heading_10" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:50px 0px 10px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><table width="100%"><tr><td><![endif]-->
                              <h1 class="v-font-size"
                                style="margin: 0px; color: #ffffff; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 30px; font-weight: 400;">
                                <span><strong>My Bakery - Lettre d'actualité</strong></span>
                              </h1>
                              <!--[if mso]></td></tr></table><![endif]-->

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table id="u_content_text_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <div class="v-font-size"
                                style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 140%; margin: 0px;">Restez informé des dernières nouveautés grâce
                                  à notre lettre d'actualité My Bakery !  Ne manquez rien de nos mises à jour, Nouvelles
                                  boulangeries ajoutées dans votre région, Mises à jour de notre blog avec de délicieux
                                  articles, Fonctionnalités inédites sur notre application, et bien plus encore !</p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table id="u_content_button_1" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><![endif]-->
                              <div align="center">
                                <!--[if mso]><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" bgcolor="#cd9b33" style="padding:10px 20px;" valign="top"><![endif]-->
                                <a href="https://my-bakery.fr/" target="_blank"
                                  class="v-button v-size-width v-font-size"
                                  style="box-sizing: border-box; display: inline-block; text-decoration: none; text-size-adjust: none; text-align: center; color: rgb(255, 255, 255); background: transparent; border-radius: 6px; width: auto; max-width: 100%; word-break: break-word; overflow-wrap: break-word; border-width: 2px; border-style: solid; border-color: rgb(205, 155, 51); font-size: 14px; font-weight: 700; line-height: inherit;"><span
                                    style="display:block;padding:10px 20px;line-height:120%;"><span
                                      style="line-height: 19.2px; font-size: 16px;">Découvrez ce qui vous
                                      attend</span></span>
                                </a>
                                <!--[if mso]></td></tr></table><![endif]-->
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div><!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>

          <!--[if gte mso 9]>
      </v:textbox></v:rect>
    </td>
    </tr>
    </table>
    <![endif]-->`

    return html

  },

  setOther: () => {

    var html = `<!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
    <!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>

    <style type="text/css">
        @media only screen and (min-width: 620px) {
        .u-row {
            width: 600px !important;
        }

        .u-row .u-col {
            vertical-align: top;
        }


        .u-row .u-col-33p33 {
            width: 199.98px !important;
        }


        .u-row .u-col-50 {
            width: 300px !important;
        }


        .u-row .u-col-66p67 {
            width: 400.02px !important;
        }


        .u-row .u-col-100 {
            width: 600px !important;
        }

        }

        @media only screen and (max-width: 620px) {
        .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
        }

        .u-row {
            width: 100% !important;
        }

        .u-row .u-col {
            display: block !important;
            width: 100% !important;
            min-width: 320px !important;
            max-width: 100% !important;
        }

        .u-row .u-col>div {
            margin: 0 auto;
        }


        .u-row .u-col img {
            max-width: 100% !important;
        }

        }

        body {
        margin: 0;
        padding: 0
        }

        table,
        td,
        tr {
        border-collapse: collapse;
        vertical-align: top
        }

        .ie-container table,
        .mso-container table {
        table-layout: fixed
        }

        * {
        line-height: inherit
        }

        a[x-apple-data-detectors=true] {
        color: inherit !important;
        text-decoration: none !important
        }


        table,
        td {
        color: #000000;
        }

        @media (max-width: 480px) {
        #u_content_heading_10 .v-font-size {
            font-size: 30px !important;
        }

        #u_content_text_5 .v-container-padding-padding {
            padding: 10px !important;
        }

        #u_content_button_1 .v-size-width {
            width: 65% !important;
        }

        #u_content_heading_2 .v-container-padding-padding {
            padding: 40px 20px 20px !important;
        }

        #u_content_heading_2 .v-font-size {
            font-size: 25px !important;
        }

        #u_row_3.v-row-padding--vertical {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
        }

        #u_content_image_2 .v-container-padding-padding {
            padding: 30px 10px 10px !important;
        }

        #u_content_image_2 .v-src-width {
            width: 100% !important;
        }

        #u_content_image_2 .v-src-max-width {
            max-width: 28% !important;
        }

        #u_content_text_4 .v-container-padding-padding {
            padding: 10px 10px 30px !important;
        }

        #u_content_button_2 .v-size-width {
            width: 65% !important;
        }

        #u_content_button_2 .v-container-padding-padding {
            padding: 20px 10px 40px !important;
        }

        #u_content_button_5 .v-size-width {
            width: 65% !important;
        }

        #u_content_button_5 .v-container-padding-padding {
            padding: 20px 10px 40px !important;
        }

        #u_content_heading_5 .v-container-padding-padding {
            padding: 40px 10px 0px !important;
        }

        #u_content_heading_5 .v-font-size {
            font-size: 27px !important;
        }

        #u_content_text_7 .v-container-padding-padding {
            padding: 10px 10px 20px !important;
        }

        #u_content_button_3 .v-size-width {
            width: 65% !important;
        }

        #u_content_button_3 .v-container-padding-padding {
            padding: 20px 10px 40px !important;
        }

        #u_content_heading_7 .v-container-padding-padding {
            padding: 40px 20px 20px !important;
        }

        #u_content_heading_7 .v-font-size {
            font-size: 25px !important;
        }

        #u_content_social_1 .v-container-padding-padding {
            padding: 40px 10px 10px !important;
        }

        #u_content_text_8 .v-container-padding-padding {
            padding: 10px 10px 20px !important;
        }
        }

        .u-row .u-col.u-col-50:first-child {
        margin-right: 2rem;
        }

        @media all and (max-width: 768px) {

        .u-row div:first-child {
            display: table !important;
        }

        .u-row .u-col.u-col-50:first-child {
            margin-right: 0;
        }
        }

        .content::before {
        color: #8b7a7a;
        content: "\f061";
        font: normal normal normal 20px / 1 FontAwesome;
        font-size: 14px;
        left: -16px;
        position: relative;
        }

        #m_-814258896841190503u_content_image_2 {
          position: relative;
        }

        #m_-814258896841190503u_content_text_4 {
         font-family:'Raleway',sans-serif;background: #f7f7f7;position: absolute;bottom: 285px;left: 0;width: calc(100% - 40px);height: auto;
        }
    </style>

    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Federo&display=swap" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap" rel="stylesheet"
        type="text/css"><!--<![endif]-->

    <script src=https://kit.fontawesome.com/6650c3fdcf.js crossorigin=anonymous></script>

    </head>
    <body class="clean-body u_body"
style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table id="u_body"
style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%"
cellpadding="0" cellspacing="0">
<tbody>
<tr style="vertical-align: top">
<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->



  <!--[if gte mso 9]>
<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
<tr>
  <td background="https://cdn.templates.unlayer.com/assets/1715758294520-header.png" valign="top" width="100%">
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
<v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1715758294520-header.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
<![endif]-->

  <div class="u-row-container v-row-padding--vertical"
    style="padding: 30px 0px;background-image: url('https://my-bakery.fr/background-web-mail.png');background-repeat: no-repeat;background-position: left top;background-color: #0d0b03">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div
        style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 30px 0px;background-image: url('https://my-bakery.fr/image-10.png');background-repeat: no-repeat;background-position: left top;background-color: #0d0b03;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

        <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-33p33"
          style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
              <!--<![endif]-->

              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:90px 10px;font-family:'Raleway',sans-serif;"
                      align="left">

                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
                            <a href="https://my-bakery.fr/" target="_blank"
                              style="color: rgb(0, 0, 238); text-decoration: underline; line-height: inherit;"><img
                                align="center" border="0" src="https://my-bakery.fr/logo-dark.png" alt=""
                                title=""
                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 78%;max-width: 140.4px;"
                                width="140.4" class="v-src-width v-src-max-width" />
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </tbody>
              </table>

              <!--[if (!mso)&(!IE)]><!-->
            </div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-66p67"
          style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->

              <table id="u_content_heading_10" style="font-family:'Raleway',sans-serif;" role="presentation"
                cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:100px 0px 10px;font-family:'Raleway',sans-serif;"
                      align="left">

                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                      <h1 class="v-font-size"
                        style="margin: 0px; color: #ffffff; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 30px; font-weight: 400;">
                        <span><strong>My Bakery</strong></span>
                      </h1>
                      <!--[if mso]></td></tr></table><![endif]-->

                    </td>
                  </tr>
                </tbody>
              </table>

              <table id="u_content_button_1" style="font-family:'Raleway',sans-serif;" role="presentation"
                cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px;font-family:'Raleway',sans-serif;"
                      align="left">

                      <!--[if mso]><![endif]-->
                      <div align="center">
                        <!--[if mso]><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" bgcolor="#cd9b33" style="padding:10px 20px;" valign="top"><![endif]-->
                        <a href="https://my-bakery.fr/" target="_blank"
                          class="v-button v-size-width v-font-size"
                          style="box-sizing: border-box; display: inline-block; text-decoration: none; text-size-adjust: none; text-align: center; color: rgb(255, 255, 255); background: transparent; border-radius: 6px; width: auto; max-width: 100%; word-break: break-word; overflow-wrap: break-word; border-width: 2px; border-style: solid; border-color: rgb(205, 155, 51); font-size: 14px; font-weight: 700; line-height: inherit;"><span
                            style="display:block;padding:10px 20px;line-height:120%;"><span
                              style="line-height: 19.2px; font-size: 16px;">Découvrez ce qui vous
                              attend</span></span>
                        </a>
                        <!--[if mso]></td></tr></table><![endif]-->
                      </div>

                    </td>
                  </tr>
                </tbody>
              </table>

              <!--[if (!mso)&(!IE)]><!-->
            </div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>

  <!--[if gte mso 9]>
</v:textbox></v:rect>
</td>
</tr>
</table>
<![endif]-->`

    return html

  }

}