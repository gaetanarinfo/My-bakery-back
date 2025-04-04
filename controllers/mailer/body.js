/*
 * Import Module
 ****************/
const moment = require('moment'),
  application = require('./sections/application')

moment.locale('fr')

/*
 * Controller
 *************/
module.exports = {

  set: (blogs, bakerys) => {

    var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: #f7f7f7">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f7f7f7;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table id="u_content_heading_2" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><table width="100%"><tr><td><![endif]-->
                              <h1 class="v-font-size"
                                style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                                <span>Notre Blog</span>
                              </h1>
                              <!--[if mso]></td></tr></table><![endif]-->

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                        cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                    <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                                      style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                                      width="63.8" class="v-src-width v-src-max-width" />

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
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div id="u_row_3" class="u-row-container v-row-padding--vertical"
            style="padding: 0px;background-color: #f7f7f7">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f7f7f7;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;position: relative;-webkit-border-radius: 0px;-moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box;height: 100%;position: relative;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px;-moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table id="u_content_image_2" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="https://my-bakery.fr/article/${blogs.url}" target="_blank"
                                        style="color: rgb(0, 0, 238); text-decoration: underline; line-height: inherit;"><img
                                          align="center" border="0"
                                          src="https://my-bakery.fr/${blogs.image}"
                                          alt="${blogs.title}" title="${blogs.title}"
                                          style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 768px;"
                                          width="600" class="v-src-width v-src-max-width">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                    <div class="table">
                      <table id="u_content_text_4" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding: 20px 0 0 0;font-family:'Raleway',sans-serif;background: #f7f7f7;position: absolute;bottom: 285px;left: 0;width: 100%;height: auto;"
                              align="left">

                              <div class="v-font-size"
                                style="line-height: 140%; text-align: left; word-wrap: break-word; display: flex;align-items: center;">
                                <div class="label"
                                  style="background: #f08632;color: #fff;display: inline-block;font-size: 14px;font-weight: 600;padding: 4px 15px 2px;">
                                    ${blogs.categorie}</div>
                                <p style="line-height: 140%; margin: 0px;margin-left: 25px;"><span
                                    style="color: #888; line-height: 19.6px;"><span
                                      style="font-family: Montserrat, sans-serif;line-height: 19.6px;"><strong><span
                                          style="line-height: 16.8px; font-size: 10px;">Par&nbsp;<span
                                            style="box-sizing: border-box; line-height: 16.8px;">${blogs.author}&nbsp;
                                            |&nbsp;
                                          </span></span></strong></span><span
                                      style="font-family: Montserrat, sans-serif; line-height: 19.6px;"><strong><span
                                          style="line-height: 16.8px; font-size: 10px;"><i class="fa-solid fa-clock"
                                            style="margin-right: .25rem!important" aria-hidden="true"></i> Créer le ${moment(blogs.created_at).format('DD MMMM YYYY')} à
                                          14:<span style="line-height: 16.8px;">10&nbsp; |
                                          </span></span></strong></span><span
                                      style="font-family: Montserrat, sans-serif; line-height: 19.6px;"><strong><span
                                          style="line-height: 16.8px; font-size: 10px;">${blogs.views}
                                          vues</span></strong></span></span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                      <table style="font-family:'Raleway',sans-serif;margin-top: 15px;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><table width="100%"><tr><td><![endif]-->
                              <h1 class="v-font-size"
                                style="margin: 0px; line-height: 160%; text-align: left; word-wrap: break-word; font-family: 'Playfair Display',serif; font-size: 35px; font-weight: 400;">
                                <a href="https://my-bakery.fr/article/${blogs.url}" target="_blank" style="text-decoration: none; color: #000;">
                                <span style="line-height: 56px;">
                                ${blogs.title}
                                </span>
                                </a> 
                              </h1>
                              <!--[if mso]></td></tr></table><![endif]-->

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                        cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <div class="v-font-size"
                                style="font-size: 14px; line-height: 160%; text-align: left; word-wrap: break-word;">
                                <p style="line-height: 160%; text-align: left; margin: 0px;"><span
                                    style="font-size: 16px; line-height: 25.6px; font-family: Montserrat, sans-serif;">${String(blogs.content).substr(0, 249) + '...'}</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                        cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td
                                      style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <span>&nbsp;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table id="u_content_button_2" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:20px 15px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><![endif]-->
                              <div align="right">
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://my-bakery.fr/article/${blogs.url}" style="height:39px; v-text-anchor:middle; width:135px;" arcsize="15.5%"  strokecolor="#cd9b33" strokeweight="2px" fillcolor="#f7f7f7"><w:anchorlock/><center style="color:#cd9b33;"><![endif]-->
                                <a href="https://my-bakery.fr/article/${blogs.url}" target="_blank"
                                  class="v-button v-size-width v-font-size"
                                  style="box-sizing: border-box; display: inline-block; text-decoration: none; text-size-adjust: none; text-align: center; color: rgb(205, 155, 51); background: rgb(247, 247, 247); border-radius: 6px; width: auto; max-width: 100%; word-break: break-word; overflow-wrap: break-word; border-width: 2px; border-style: solid; border-color: rgb(205, 155, 51); font-size: 16px; font-weight: 700; line-height: inherit;"><span
                                    style="display:block;padding:10px 15px;line-height:120%;"><span
                                      style="line-height: 19.2px;">En savoir plus</span></span>
                                </a>
                                <!--[if mso]></center></v:roundrect><![endif]-->
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





          <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: #f7f7f7">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f7f7f7;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;padding-bottom: 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table id="u_content_button_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><![endif]-->
                              <div align="center">
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://my-bakery.fr/blogs-bakerys" style="height:39px; v-text-anchor:middle; width:209px;" arcsize="15.5%"  strokecolor="#cd9b33" strokeweight="2px" fillcolor="#f7f7f7"><w:anchorlock/><center style="color:#cd9b33;"><![endif]-->
                                <a href="https://my-bakery.fr/blogs-bakerys" target="_blank"
                                  class="v-button v-size-width v-font-size"
                                  style="box-sizing: border-box; display: inline-block; text-decoration: none; text-size-adjust: none; text-align: center; color: rgb(205, 155, 51); background: rgb(247, 247, 247); border-radius: 6px; width: auto; max-width: 100%; word-break: break-word; overflow-wrap: break-word; border-width: 2px; border-style: solid; border-color: rgb(205, 155, 51); font-size: 16px; font-weight: 700; line-height: inherit;"><span
                                    style="display:block;padding:10px 20px;line-height:120%;"><span
                                      style="line-height: 19.2px;">Voir les autres articles</span></span>
                                </a>
                                <!--[if mso]></center></v:roundrect><![endif]-->
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





          <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><table width="100%"><tr><td><![endif]-->
                              <h1 class="v-font-size"
                                style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                                <span><span><span><span><span><span><span><span><span
                                                  style="line-height: 30.8px;">Boulangerie à
                                                  découvrir</span></span></span></span></span></span></span></span></span>
                              </h1>
                              <!--[if mso]></td></tr></table><![endif]-->

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





          <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                        cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                    <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                                      style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                                      width="63.8" class="v-src-width v-src-max-width" />

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
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>





          <div class="u-row-container v-row-padding--vertical" style="padding: 0;background-color: transparent">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table id="u_content_text_7" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding: 10px 50px 30px 50px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <div class="v-font-size"
                                style="font-size: 14px; color: #cd9b33; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 140%; margin: 0px;"><span
                                    style="color: #cd9b33; line-height: 19.6px;"><strong><span
                                        style="line-height: 19.6px;">N’hésitez pas à explorer ces établissements et à
                                        découvrir leurs spécialités sur My Bakery !</span></strong></span></p>
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
          </div>`;

    html += `<div class="u-row" style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
             <div style="
    display: grid;
    grid-template-column: 1fr 1fr;
    grid-gap: 1rem;
    text-align: center;
    width: 100%;
">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->`


    bakerys.forEach(element => {

      var image = ''

      if (element.image === 'default.jpg') {
        image = 'https://my-bakery.fr/bakerys/' + element.image
      } else {
        image = 'https://serveur.my-bakery.fr/bakerys/images/' + element.image
      }

      html += `<!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
              <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: block;vertical-align: top;margin-bottom: 20px;">
                <div
                  style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                  <!--[if (!mso)&(!IE)]><!-->
                  <div
                    style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--<![endif]-->

                    <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                      width="100%" border="0">
                      <tbody>
                        <tr>
                          <td class="v-container-padding-padding"
                            style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                            align="left">

                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="cursor: pointer; padding-right: 0px;padding-left: 0px;border-radius: 6px;box-shadow: 5px 5px 12px hsla(0, 0%, 56%, .663);"
                                    align="center">

                                    <a href="https://my-bakery.fr/bakery/${element.url}" target="_blank">
                                      <img align="center" border="0" style="border-radius: 6px;box-shadow: 5px 5px 12px hsla(0, 0%, 56%, .663);" src="${image}"
                                        alt="${element.title}" title="${element.title}"
                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 290px;"
                                        width="290" class="v-src-width v-src-max-width">
                                    </a>

                                  </td>
                                </tr>

                                <tr style="font-family: Helvetica Neue,sans-serif;margin-top: 1rem;display: block;">
                                  <td style="font-family: Helvetica Neue,sans-serif;padding: 10px;color: #000;display: grid;font-family: inherit !important;font-size: 18px;font-weight: 700;outline: none;text-align: left;text-decoration: none;text-transform: uppercase;">
                                   <a href="https://my-bakery.fr/bakery/${element.url}" style="color:#000; text-decoration:none;" target="_blank">
                                    <span style="cursor: pointer; font-family: Helvetica Neue,sans-serif;">${element.title}</span>
                                  </a>

                                    <div>
                                      <p class="content" style="font-family: Helvetica Neue,sans-serif;color: #333434;font-size: 14px;line-height: 18px;font-weight: 400;margin-top: 1rem;text-align: left;white-space: inherit;">${element.content}</p>
                                    </div>
                                  </td>
                                </tr>

                                <tr>

                                  <td>

                                    <div align="right">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://my-bakery.fr/bakery/${element.url}" style="height:39px; v-text-anchor:middle; width:135px;" arcsize="15.5%"  strokecolor="#cd9b33" strokeweight="2px" fillcolor="#f7f7f7"><w:anchorlock/><center style="color:#cd9b33;"><![endif]-->
                                      <a href="https://my-bakery.fr/bakery/${element.url}" target="_blank"
                                        class="v-button v-size-width v-font-size"
                                        style="box-sizing: border-box; display: inline-block; text-decoration: none; text-size-adjust: none; text-align: center; color: rgb(205, 155, 51); background: transparent; border-radius: 6px; width: auto; max-width: 100%; word-break: break-word; overflow-wrap: break-word; border-width: 2px; border-style: solid; border-color: rgb(205, 155, 51); font-size: 16px; font-weight: 700; line-height: inherit;"><span
                                          style="display:block;padding:10px 15px;line-height:120%;"><span
                                            style="line-height: 19.2px;">En savoir plus</span></span>
                                      </a>
                                      <!--[if mso]></center></v:roundrect><![endif]-->
                                    </div>

                                  </td>

                                </tr>

                              </tbody>
                            </table>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                  </div><!--<![endif]-->
                </div>
              </div>`

    });

    html += `</div>
    </div>`

    html += `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
            <div class="u-row"
              style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                  <div
                    style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--<![endif]-->

                      <table id="u_content_button_3" style="font-family:'Raleway',sans-serif;" role="presentation"
                        cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding"
                              style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 60px;font-family:'Raleway',sans-serif;"
                              align="left">

                              <!--[if mso]><![endif]-->
                              <div align="center">
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://my-bakery.fr/bakerys-pastry" style="height:39px; v-text-anchor:middle; width:253px;" arcsize="15.5%"  strokecolor="#cd9b33" strokeweight="2px" fillcolor="#f4f8f0"><w:anchorlock/><center style="color:#cd9b33;"><![endif]-->
                                <a href="https://my-bakery.fr/bakerys-pastry" target="_blank"
                                  class="v-button v-size-width v-font-size"
                                  style="box-sizing: border-box; display: inline-block; text-decoration: none; text-size-adjust: none; text-align: center; color: rgb(205, 155, 51); background: transparent; border-radius: 6px; width: auto; max-width: 100%; word-break: break-word; overflow-wrap: break-word; border-width: 2px; border-style: solid; border-color: rgb(205, 155, 51); font-size: 16px; font-weight: 700; line-height: inherit;"><span
                                    style="display:block;padding:10px 20px;line-height:120%;"><span
                                      style="line-height: 19.2px;">Voir les autres boulangeries</span></span>
                                </a>
                                <!--[if mso]></center></v:roundrect><![endif]-->
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
          </div>`

    html += application.set()

    return html

  },

  setRegister: (title, content, content2, content3, content4, content5, content6, content7, content8, content9, content10, content11, content12, content13, link) => {

    var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
  <div class="u-row"
    style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->

            <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
              cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                    align="left">

                    <!--[if mso]><table width="100%"><tr><td><![endif]-->
                    <h1 class="v-font-size"
                      style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                      <span><span><span><span><span><span><span><span><span
                                        style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                    </h1>
                    <!--[if mso]></td></tr></table><![endif]-->

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





<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
  <div class="u-row"
    style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->

            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
              width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                    align="left">

                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 0px;padding-left: 0px;" align="center">

                          <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                            width="63.8" class="v-src-width v-src-max-width" />

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
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>

<div class="u-row"
  style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
  <div style="
    display: grid;
    grid-template-column: 1fr 1fr;
    grid-gap: 1rem;
    text-align: center;
    width: 100%;
">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->


    <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50"
      style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
      <div
        style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!-->
        <div
          style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--<![endif]-->

          <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
            width="100%" border="0">
            <tbody>
              <tr>
                <td class="v-container-padding-padding"
                  style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                  align="left">

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>

                        <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">

                          <p style="font-weight: 600;font-size: 18px;">${content}</p>
                          <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                          <p style="font-size: 18px;margin: 0;">${content3}</p>
                          <p style="font-size: 18px;margin: 0;">${content4}</p>
                          <p style="font-size: 18px;margin: 0;font-weight: 600;">${content5}</p>
                          <p style="font-size: 18px;margin: 0;font-weight: 600;">${content6}</p>
                          <p style="font-size: 18px;margin: 0;">${content7}</p>
                          <p style="font-size: 18px;margin: 0;">${content8}</p>
                          <p style="font-size: 18px;margin: 0;">${content9}</p>
                          <p style="font-size: 18px;margin: 0;">${content10}</p>
                          <p style="font-size: 18px;">${content11}</p>
                          <p style="font-size: 18px;">${content12}</p>
                          (<p style="font-size: 18px;">${content13}</p>
                          <p style="font-size: 18px;">${link}</p>

                        </td>

                      </tr>

                    </tbody>
                  </table>

                </td>
              </tr>
            </tbody>
          </table>

          <!--[if (!mso)&(!IE)]><!-->
        </div><!--<![endif]-->
      </div>
    </div>

  </div>
</div>`

    html += application.set()

    return html

  },

  setLogin: (title, content, content2, content3, content4, content5, content6, link) => {

    var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
  <div class="u-row"
    style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->

            <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
              cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                    align="left">

                    <!--[if mso]><table width="100%"><tr><td><![endif]-->
                    <h1 class="v-font-size"
                      style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                      <span><span><span><span><span><span><span><span><span
                                        style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                    </h1>
                    <!--[if mso]></td></tr></table><![endif]-->

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





<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
  <div class="u-row"
    style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->

            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
              width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                    align="left">

                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 0px;padding-left: 0px;" align="center">

                          <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                            width="63.8" class="v-src-width v-src-max-width" />

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
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>

<div class="u-row"
  style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
  <div style="
    display: grid;
    grid-template-column: 1fr 1fr;
    grid-gap: 1rem;
    text-align: center;
    width: 100%;
">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->


    <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50"
      style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
      <div
        style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!-->
        <div
          style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--<![endif]-->

          <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
            width="100%" border="0">
            <tbody>
              <tr>
                <td class="v-container-padding-padding"
                  style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                  align="left">

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>

                        <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">

                          <p style="font-weight: 600;font-size: 18px;">${content}</p>
                          <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                          <p style="font-size: 18px;margin: 0;">${content3}</p>
                          <p style="font-size: 18px;">${content4}</p>
                          <p style="font-size: 18px;">${content5}</p>
                          <p style="font-size: 18px;">${content6}</p>
                          <p style="font-size: 18px;">${link}</p>

                        </td>

                      </tr>

                    </tbody>
                  </table>

                </td>
              </tr>
            </tbody>
          </table>

          <!--[if (!mso)&(!IE)]><!-->
        </div><!--<![endif]-->
      </div>
    </div>

  </div>
</div>`

    html += application.set()

    return html

  },

  setOrderSucces: (product, title, content, content2, content3, content4, content5, content5_5, content5_5_5, content6, content7, content8, content8_8, content9, content10, content11) => {

    if (product >= 3) {

      var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                      <h1 class="v-font-size"
                        style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                        <span><span><span><span><span><span><span><span><span
                                          style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                      </h1>
                      <!--[if mso]></td></tr></table><![endif]-->
  
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
  
  
  
  
  
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                            <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                              width="63.8" class="v-src-width v-src-max-width" />
  
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
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  <div class="u-row"
    style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
    <div style="
      display: grid;
      grid-template-column: 1fr 1fr;
      grid-gap: 1rem;
      text-align: center;
      width: 100%;
  ">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
  
      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-50"
        style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->
  
            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
              width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                    align="left">
  
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
  
                          <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">
  
                            <p style="font-weight: 600;font-size: 18px;">${content}</p>
                            <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                            <p style="font-size: 18px;margin: 0;">${content3}</p>
                            <p style="font-size: 18px;margin: 0;">${content4}</p>
                            <p style="font-size: 18px;margin: 0;">${content5}</p>
                            <p style="font-size: 18px;margin: 0;">${content5_5}</p>
                            <p style="font-size: 18px;margin: 0;">${content5_5_5}</p>
                            <p style="font-size: 18px;margin: 0;">${content6}</p>
                            <p style="font-size: 18px;margin: 0;">${content7}</p>
                            <p style="font-size: 18px;margin: 0;">${content8}</p>
                            <p style="font-size: 18px;">${content8_8}</p>
                            <p style="font-size: 18px;">${content9}</p>
                            <p style="font-size: 18px;">${content10}</p>
                            <p style="font-size: 18px;">${content11}</p>
  
                          </td>
  
                        </tr>
  
                      </tbody>
                    </table>
  
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!--[if (!mso)&(!IE)]><!-->
          </div><!--<![endif]-->
        </div>
      </div>
  
    </div>
  </div>`

    }

    if (product <= 2) {

      var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
      <div class="u-row"
        style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
            <div
              style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!-->
              <div
                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--<![endif]-->
    
                <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                  cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td class="v-container-padding-padding"
                        style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                        align="left">
    
                        <!--[if mso]><table width="100%"><tr><td><![endif]-->
                        <h1 class="v-font-size"
                          style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                          <span><span><span><span><span><span><span><span><span
                                            style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                        </h1>
                        <!--[if mso]></td></tr></table><![endif]-->
    
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
    
    
    
    
    
    <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
      <div class="u-row"
        style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
          <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
            <div
              style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!-->
              <div
                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                <!--<![endif]-->
    
                <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                  width="100%" border="0">
                  <tbody>
                    <tr>
                      <td class="v-container-padding-padding"
                        style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                        align="left">
    
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                              <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                                width="63.8" class="v-src-width v-src-max-width" />
    
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
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    <div class="u-row"
      style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
      <div style="
        display: grid;
        grid-template-column: 1fr 1fr;
        grid-gap: 1rem;
        text-align: center;
        width: 100%;
    ">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
    
        <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-50"
          style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
    
              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                      align="left">
    
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
    
                            <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">
    
                              <p style="font-weight: 600;font-size: 18px;">${content}</p>
                              <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                              <p style="font-size: 18px;margin: 0;">${content3}</p>
                              <p style="font-size: 18px;margin: 0;">${content4}</p>
                              <p style="font-size: 18px;margin: 0;">${content5}</p>
                              <p style="font-size: 18px;margin: 0;">${content6}</p>
                              <p style="font-size: 18px;margin: 0;">${content7}</p>
                              <p style="font-size: 18px;margin: 0;">${content8}</p>
                              <p style="font-size: 18px;">${content9}</p>
                              <p style="font-size: 18px;">${content10}</p>
                              <p style="font-size: 18px;">${content11}</p>
    
                            </td>
    
                          </tr>
    
                        </tbody>
                      </table>
    
                    </td>
                  </tr>
                </tbody>
              </table>
    
              <!--[if (!mso)&(!IE)]><!-->
            </div><!--<![endif]-->
          </div>
        </div>
    
      </div>
    </div>`

    }

    html += application.set()

    return html

  },

  setOrderRefund: (title, content, content2, content3, content4, content5, content6) => {

    var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                      <h1 class="v-font-size"
                        style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                        <span><span><span><span><span><span><span><span><span
                                          style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                      </h1>
                      <!--[if mso]></td></tr></table><![endif]-->
  
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
  
  
  
  
  
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                            <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                              width="63.8" class="v-src-width v-src-max-width" />
  
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
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  <div class="u-row"
    style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
    <div style="
      display: grid;
      grid-template-column: 1fr 1fr;
      grid-gap: 1rem;
      text-align: center;
      width: 100%;
  ">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
  
      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-50"
        style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->
  
            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
              width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                    align="left">
  
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
  
                          <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">
  
                            <p style="font-weight: 600;font-size: 18px;">${content}</p>
                            <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                            <p style="font-size: 18px;">${content3}</p>
                            <p style="font-size: 18px;">${content4}</p>
                            <p style="font-size: 18px;">${content5}</p>
                            <p style="font-size: 18px;">${content6}</p>
  
                          </td>
  
                        </tr>
  
                      </tbody>
                    </table>
  
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!--[if (!mso)&(!IE)]><!-->
          </div><!--<![endif]-->
        </div>
      </div>
  
    </div>
  </div>`

    html += application.set()

    return html

  },

  setOrderCancel: (title, content, content2, content3, content4, content5, content6) => {

    var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                      <h1 class="v-font-size"
                        style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                        <span><span><span><span><span><span><span><span><span
                                          style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                      </h1>
                      <!--[if mso]></td></tr></table><![endif]-->
  
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
  
  
  
  
  
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                            <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                              width="63.8" class="v-src-width v-src-max-width" />
  
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
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  <div class="u-row"
    style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
    <div style="
      display: grid;
      grid-template-column: 1fr 1fr;
      grid-gap: 1rem;
      text-align: center;
      width: 100%;
  ">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
  
      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-50"
        style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->
  
            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
              width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                    align="left">
  
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
  
                          <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">
  
                            <p style="font-weight: 600;font-size: 18px;">${content}</p>
                            <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                            <p style="font-size: 18px;">${content3}</p>
                            <p style="font-size: 18px;">${content4}</p>
                            <p style="font-size: 18px;">${content5}</p>
                            <p style="font-size: 18px;">${content6}</p>
  
                          </td>
  
                        </tr>
  
                      </tbody>
                    </table>
  
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!--[if (!mso)&(!IE)]><!-->
          </div><!--<![endif]-->
        </div>
      </div>
  
    </div>
  </div>`

    html += application.set()

    return html

  },

  setForgot: (title, content, content2, content3, content4, content5, content6, content7, link) => {

    var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                      <h1 class="v-font-size"
                        style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                        <span><span><span><span><span><span><span><span><span
                                          style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                      </h1>
                      <!--[if mso]></td></tr></table><![endif]-->
  
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
  
  
  
  
  
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                            <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                              width="63.8" class="v-src-width v-src-max-width" />
  
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
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  <div class="u-row"
    style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
    <div style="
      display: grid;
      grid-template-column: 1fr 1fr;
      grid-gap: 1rem;
      text-align: center;
      width: 100%;
  ">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
  
      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-50"
        style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->
  
            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
              width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                    align="left">
  
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
  
                          <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">
  
                            <p style="font-weight: 600;font-size: 18px;">${content}</p>
                            <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                            <p style="font-size: 18px;">${content3}</p>
                            <p style="font-size: 18px;">${content4}</p>
                            <p style="font-size: 18px;">${content5}</p>
                            <p style="font-size: 18px;">${content6}</p>
                            <p style="font-size: 18px;">${content7}</p>
                            <p style="font-size: 18px;">${link}</p>
  
                          </td>
  
                        </tr>
  
                      </tbody>
                    </table>
  
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!--[if (!mso)&(!IE)]><!-->
          </div><!--<![endif]-->
        </div>
      </div>
  
    </div>
  </div>`

    html += application.set()

    return html

  },

  setTokenforgot: (title, content, content2, content3, content4, content5, content6, content7, link) => {

    var html = `<div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table id="u_content_heading_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                cellpadding="0" cellspacing="0" width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:60px 0px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                      <h1 class="v-font-size"
                        style="margin: 0px; color: #000000; line-height: 110%; text-align: center; word-wrap: break-word; font-family: Federo; font-size: 40px; font-weight: 400;">
                        <span><span><span><span><span><span><span><span><span
                                          style="line-height: 30.8px;">${title}</span></span></span></span></span></span></span></span></span>
                      </h1>
                      <!--[if mso]></td></tr></table><![endif]-->
  
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
  
  
  
  
  
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row"
      style="margin: 0 auto;min-width: 320px;max-width: 768px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div
            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--[if (!mso)&(!IE)]><!-->
            <div
              style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--<![endif]-->
  
              <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                width="100%" border="0">
                <tbody>
                  <tr>
                    <td class="v-container-padding-padding"
                      style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Raleway',sans-serif;"
                      align="left">
  
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                            <img align="center" border="0" src="https://my-bakery.fr/floral.png" alt="" title=""
                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 11%;max-width: 63.8px;"
                              width="63.8" class="v-src-width v-src-max-width" />
  
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
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  <div class="u-row"
    style="margin:0 auto;min-width:320px;display: table;max-width:768px;word-wrap:break-word;word-break:break-word;background-color:transparent">
    <div style="
      display: grid;
      grid-template-column: 1fr 1fr;
      grid-gap: 1rem;
      text-align: center;
      width: 100%;
  ">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
  
      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-50"
        style="max-width: 320px;min-width: 768px;display: block;vertical-align: top;margin-bottom: 20px;">
        <div
          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
          <!--[if (!mso)&(!IE)]><!-->
          <div
            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
            <!--<![endif]-->
  
            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
              width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding"
                    style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Raleway',sans-serif;"
                    align="left">
  
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
  
                          <td style="cursor: pointer; padding-right: 0px;padding-left: 0px;" align="left">
  
                            <p style="font-weight: 600;font-size: 18px;">${content}</p>
                            <p style="font-weight: 600;font-size: 18px;">${content2}</p>
                            <p style="font-size: 18px;margin: 0;">${content3}</p>
                            <p style="font-size: 18px;margin: 0;">${content4}</p>
                            <p style="font-size: 18px;">${content5}</p>
                            <p style="font-size: 18px;">${content6}</p>
                            <p style="font-size: 18px;">${content7}</p>
                            <p style="font-size: 18px;">${link}</p>
  
                          </td>
  
                        </tr>
  
                      </tbody>
                    </table>
  
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!--[if (!mso)&(!IE)]><!-->
          </div><!--<![endif]-->
        </div>
      </div>
  
    </div>
  </div>`

    html += application.set()

    return html


  },

}