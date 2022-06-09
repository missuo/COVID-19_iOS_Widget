/*
 * @Author: Vincent Young
 * @Date: 2022-06-09 20:41:57
 * @LastEditors: Vincent Young
 * @LastEditTime: 2022-06-09 20:44:04
 * @FilePath: /COVID-19_iOS_Widget/COVID19.js
 * @Telegram: https://t.me/missuo
 * 
 * Copyright © 2022 by Vincent, All Rights Reserved. 
 */

const inputValue = "1"

if (inputValue) {
    let resp =await $http.get({
        url: "https://portal.zjzwfw.gov.cn/portal/v2/nucleicAcid/queryList",

       // 自行修改COOKIE
        header: {
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
            "Cookie": "",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20A5283p Ariver/1.0.10 Jupiter/1.0.0 000001@ZLB_iphone_6.19.0 hanweb_iphone_/hanweb/dtdreamweb/bundleVersion6.19.0",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br"
        }
        });

    let data = resp.data.data[0]
    let username = data.patientname
    let sampleDate = data.collectTime.replace("T"," ")
    let title = data.jgmc
    let logo = "https://s3.missuo.me/images/xEWdzv.png"


    let counters =[0,1]
    let counter_view = []
    let type_view = []

    const now = new Date();
    const sampleDate_datetime = new Date(sampleDate.replace(/-/g,"/"))    
    const expireDate = parseInt(72-(now.getTime()-sampleDate_datetime)/60/60/1000)
    console.log(expireDate)

    
    for (var i in counters) {
        counter_view.push({
            type: "text",
            props: {
                text: expireDate.toString()+"h",
                font: $font("bold", 18),
                light: "#282828",
                dark: "white",
                minimumScaleFactor: 0.5,
                lineLimit: 1
            }
        })
        type_view.push({
            type: "text",
            props: {
                text: "72h倒计时",
                font: $font(10),
                color: $color("#aaaaaa"),
                minimumScaleFactor: 0.5,
                lineLimit: 1
            }
        })
    }

    $widget.setTimeline({
        render: ctx => {
            //$widget.family = 0
            const family = ctx.family;
            const width = $widget.displaySize.width
            const height = $widget.displaySize.height

            const logo_view = {
                type: "image",
                props: {
                    uri: logo,
                    frame: {
                        width: 60,
                        height: 60
                    },
                    resizable: true,
                    cornerRadius: 15
                }
            }

            const desc = {
                type: "text",
                props: {
                    text: username + " 上次核酸",
                    font: $font(10),
                    color: $color("#aaaaaa"),
                    minimumScaleFactor: 0.5,
                    lineLimit: 1
                }
            }

            const title_view = {
                type: "text",
                props: {
                    text: title,
                    font: family == 0 ? $font("bold", 20) : $font("bold", 25),
                    light: "#282828",
                    dark: "white",
                    minimumScaleFactor: 0.5,
                    lineLimit: 1
                }
            }

            const path_view = {
                type: "text",
                props: {
                    text: "@" + sampleDate,
                    font: $font(10),
                    color: $color("#2481cc"),
                    minimumScaleFactor: 0.5,
                    lineLimit: 1
                }
            }

            const small_widget = [
                {
                    
                    type: "hstack",
                    props: {
                        
                        alignment: $widget.verticalAlignment.center,
                        frame: {
                            width: width - 30,
                            height: 60
                        },
                        spacing: 0
                    },
                    views: [
                        logo_view,
                        {
                            type: "vstack",
                            props: {
                            
                                
                                alignment: $widget.horizontalAlignment.center,
                                frame: {
                                    maxWidth: Infinity,
                                    maxHeight: Infinity
                                },
                                spacing: 0
                            },
                            views: [
                                counter_view.concat(type_view)[0],
                                counter_view.concat(type_view)[counter_view.concat(type_view).length / 2]
                            ]
                        }
                    ]
                },
                spacerMaker(10, width - 30),
                desc,
                spacerMaker(3, width - 30),
                title_view,
                spacerMaker(3, width - 30),
                path_view
            ]

            
            // blaunch ，是app store 需要安装「小捷径」才能跳转
            return {
                type: "vstack",
                props: {
                    
                    alignment: $widget.horizontalAlignment.leading,
                    frame: {
                        width: width - 30,
                        height: height
                    },

                    spacing: 0,
                    widgetURL: "blaunch://wx?id=gh_d4acc9de8978&path=pages/suishenma/jiankangma/index.html?needLogin=false&scene=0"
                    
                },
                views: small_widget
            }
        }
    })
}

function spacerMaker(height, width) {
    return {
        type: "spacer",

        props: {
            frame: {
                width: width,
                height: height
            }
        }
    }
}
