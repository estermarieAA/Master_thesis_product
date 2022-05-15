let existColor = '#4f4';
let emptyColor = '#ff00f7';
let missingColor = '#f44';
let textColor = 'rgba(0, 0, 0)';
let backgroundColor = "rgba(255, 255, 255, 0.7)"
let textlink;
let buttontext;
let alltext= [];


// calls z index of website, to specify stack order, so extension layer will be on top
function getHighestZindex() {
  let zindex = 1;
  document.querySelectorAll('*').forEach((el) => {
    const elZindex = window.getComputedStyle(el).zIndex;
    zindex = isNaN(elZindex) ? zindex : Math.max(zindex, elZindex);
  });
  return zindex;
}

function isHidden(el) {
  return el.getClientRects().length === 0;
}

//function creates a label for each of the queried elements and gives them a style
function createLabel(item, text, color) {
  const d = document.createElement('div'),
    s = d.style,
    imgBox = item.getClientRects();

  d.textContent = text;
  s.color = textColor;
  s.boxSizing = 'border-box';
  s.position = 'absolute';
  s.top = (window.scrollY + imgBox[0].top) + 'px';
  s.left = (window.scrollX + imgBox[0].left) + 'px';
  s.padding = '3px';
  s.background = backgroundColor;
  s.border = "2px solid" + color;
  s.fontFamily = 'Arial, sans-serif';
  s.fontWeight = "bold"
  s.fontSize = '8px';
  s.pointerEvents = 'none';
  s.width = imgBox[0].width + 'px';
  s.minWidth = '60px';

  return d;

}

// function creates layer for descriptions
function init() {
  const zIndex = getHighestZindex() + 1;

  let layer = document.querySelector('#alt-text-viewer-layer');

  if (layer) {
    document.body.removeChild(layer);
  }
  else {
    layer = document.createElement('div');
    layer.id = 'alt-text-viewer-layer';

    layer.style.zIndex = zIndex;
    layer.style.position = 'absolute';
    layer.style.top = 0;
    layer.style.left = 0;
    layer.style.pointerEvents = 'none';

    document.body.appendChild(layer);




//function queries all div elements, and check attributes for all div elements of button type
    document.querySelectorAll('div').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let aria = item.getAttribute('aria-label'),
        role = item.getAttribute("role"),
        type = item.getAttribute("type"),
        content = item.textContent,
        text,
          color;

// checking description for buttons
      if( role === "button"){

      if(!aria){
        text += " ";
      } else{
        text += aria;
        color = existColor;
      }

      if (content === null) {
          text += ' ';
          color = missingColor;
        }
        else {
          text +=  content;
          color = existColor;
        }

        text += " , button";


      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
}

alltext.push(text);

    });

//function queries all img elements, and check attributes for all img elements
    document.querySelectorAll('img').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let alt = item.getAttribute("alt"),
        text,
        color;


      if (alt === null) {
        text = 'Description not available to you ';
        color = missingColor;
      }
      else if (alt.trim() === '') {
        text = 'Description not available to you';
        color = emptyColor;
      }
      else if (alt.trim().length < 10) {
        text =  alt;
        color = emptyColor;
      }
      else {
        text =  alt;
        color = existColor;
      }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all a elements, and check attributes for all a elements
    document.querySelectorAll('a').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let aria = item.getAttribute('aria-label'),
        role = item.getAttribute("role"),
        title = item.getAttribute("title"),
        content = item.textContent,
        text,
          color;

      if (!aria && !title) {
          text = '';
          color = missingColor;
            // isrc = imgsrc[2];
        } else {
          if (!aria){
            text = title + " , ";
          } else if (!title){
            text = aria + " , ";
            color = existColor;
          } else {
            text = aria + " , " + title;
            color = existColor;
          }
        }

        if (content === null) {
            text += ' -  ';
            color = missingColor;
          }
          else if (content.trim() === '') {
            text += ' - ';
            color = emptyColor;
          }
          else {
            text +=  content;
            color = existColor;
          }

        if (!role) {
          text += ' ,Link';
        }
        else if (role.textContent && d.textContent.trim().length === 0) {
          text += ' ,Link';
        }
        else {
          text += ' , ' + role;
        }



        textlink = text;

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all svg elements, and check attributes for all svg elements
    document.querySelectorAll('svg').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let aria = item.getAttribute('aria-label'),
        role = item.getAttribute("role"),
        text,
          color;


      if (!aria && !role) {
        text = 'svg';
        color = missingColor;
      } else {

      if (!aria) {
          text = 'Label not available to you';
          color = emptyColor;
        }

        else {
          text =  aria;
          color = existColor;
        }

        if (!role) {
          text += 'No available role';
          color = emptyColor;

        }
        else if (role.textContent && role.textContent.trim().length === 0) {
          text += 'Empty role';
          color = emptyColor;
        }
        else {
          text += ' , ' + role;
          color = existColor;
        }
      }


      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all button elements, and check attributes for all button elements
    document.querySelectorAll('button').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let aria = item.getAttribute('aria-label'),
        role = item.getAttribute("role"),
        type = item.getAttribute("type"),
        content = item.textContent,
        text,
          color;

      if (!aria && !role && !type && content === null) {
        text = '';
        color = missingColor;
      } else {
        if(!aria){
          text = "";
          color = emptyColor;
        } else {
          text = aria;
          color = existColor;
        }

        if (content === null){
          text += "";
          color = emptyColor;
        } else {
          text += content;
          color = existColor;
        }

          if (!role && !type){
        text += " No available role";
        color = missingColor;
        } else if (!role){
            text += " , " + type;
            color = emptyColor;
          } else if (!type){
            text += " , " + role;
            color = emptyColor;
          } else {
            text += type + " , " + role;
            color = existColor;
          }
        }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all input elements, and check attributes for all input elements
    document.querySelectorAll('input').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let aria = item.getAttribute('aria-label'),
        role = item.getAttribute("role"),
        type = item.getAttribute("type"),
        text,
          color;

      if (!aria && !role && !type) {
        text = '';
        color = missingColor;
          // isrc = imgsrc[2];
      } else {
        if(!aria){
          text = "";
          color = emptyColor;
        } else{
          text = aria;
          color = existColor;
        }

          if (!role && !type){
        text += " No available role";
        color = missingColor;
        } else if (!role){
            text += " , " + type;
            color = emptyColor;
          } else if (!type){
            text += " , " + role;
            color = emptyColor;
          } else {
            text += type + " , " + role;
            color = existColor;
          }
        }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all h1 elements, and checks textcontent of header
    document.querySelectorAll('h1').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let content = item.textContent,
      role = item.getAttribute("role"),
        text,
          color;

          if(content === null){
            text = "Empty header"
            color = missingColor
          } else {
            text = "h1:" + content
            color = "#4287f5"
          }

          if(!role){
            text += ""
          } else {
            text += ", " + role
          }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all h2 elements, and checks textcontent of header
    document.querySelectorAll('h2').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let content = item.textContent,
      role = item.getAttribute("role"),
        text,
          color;

          if(content === null){
            text = "Empty header"
            color = missingColor
          } else {
            text = "h2:" + content
            color = "#4287f5"
          }

          if(!role){
            text += ""
          } else {
            text += ", " + role
          }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all h3 elements, and checks textcontent of header
    document.querySelectorAll('h3').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let content = item.textContent,
      role = item.getAttribute("role"),
        text,
          color;

          if(content === null){
            text = "Empty header"
            color = missingColor
          } else {
            text = "h3:" + content
            color = "#4287f5"
          }

          if(!role){
            text += ""
          } else {
            text += ", " + role
          }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all h4 elements, and checks textcontent of header
    document.querySelectorAll('h4').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let content = item.textContent,
      role = item.getAttribute("role"),
        text,
          color;

          if(content === null){
            text = "Empty header"
            color = missingColor
          } else {
            text = "h4:" + content
            color = "#4287f5"
          }

          if(!role){
            text += ""
          } else {
            text += ", " + role
          }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all h5 elements, and checks textcontent of header
    document.querySelectorAll('h5').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let content = item.textContent,
      role = item.getAttribute("role"),
        text,
          color;

          if(content === null){
            text = "Empty header"
            color = missingColor
          } else {
            text = "h5:" + content
            color = "#4287f5"
          }

          if(!role){
            text += ""
          } else {
            text += ", " + role
          }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

//function queries all h6 elements, and checks textcontent of header
    document.querySelectorAll('h6').forEach((item) => {

      if (isHidden(item)) {
        return;
      }

      let content = item.textContent,
      role = item.getAttribute("role"),
        text,
          color;

          if(content === null){
            text = "Empty header"
            color = missingColor
          } else {
            text = "h6:" + content
            color = "#4287f5"
          }

          if(!role){
            text += ""
          } else {
            text += ", " + role
          }

      const lbl = createLabel(item, text, color);
      lbl.style.zIndex = zIndex;
      layer.appendChild(lbl);
      alltext.push(text);
    });

// //function queries all html tags, and check lang attribute for each tag
//     document.querySelectorAll('html').forEach((item) => {
//
//               if (isHidden(item)) {
//                 return;
//               }
//
//               let lang = item.getAttribute('lang'),
//                 text,
//                   color;
//
//
//               if (lang === null) {
//                   text += ' ';
//                   color = missingColor;
//                 }
//                 else {
//                   text +=  lang;
//                   color = existColor;
//                 }
//
//                 text += " , language";
//
//     console.log("html" + lang);
//
//               const lbl = createLabel(item, text, color);
//               lbl.style.zIndex = zIndex;
//               layer.appendChild(lbl);
//
//         alltext.push(text);
//
//             });

// //function queries all div elements, and check attributes for all div elements of button type
//     document.querySelectorAll('p').forEach((item) => {
//
//         if (isHidden(item)) {
//             return;
//           }
//
//       let content = item.textContent,
//        text,
//        color;
//
//       color = existColor;
//       text  = content;
//
//       console.log("p" + text)
//
//
//                           const lbl = createLabel(item, text, color);
//                           lbl.style.zIndex = zIndex;
//                           layer.appendChild(lbl);
//
//                     alltext.push(text);
//
//                         });


  }
}

init();

console.log(alltext);
