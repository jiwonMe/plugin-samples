/**
 * @copyright Jiwon Park
 * 
 * code.ts
 */

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  if (msg.type === 'create-math') {
    const nodes: SceneNode[] = [];
    const eqFrame = figma.createNodeFromSvg(msg.eq);

    //사이즈 설정
    const scale = msg.size/17;

    //위치 및 사이즈
    eqFrame.x = figma.viewport.center.x;
    eqFrame.y = figma.viewport.center.y;
    eqFrame.resize(eqFrame.width*scale,eqFrame.height*scale);

    nodes.push(eqFrame);
    
    //flatten 작업
    const eq = figma.flatten(nodes);
    eq.name = 'equation';

    //현재 페이지에 추가
    figma.currentPage.appendChild(eq);
    nodes.pop();
    nodes.push(eq);

    //생성된 객체 선택
    figma.currentPage.selection = nodes;
    //생성된 객체로 viewport 이동 및 확대
    //figma.viewport.scrollAndZoomIntoView(nodes);
  }

  //plot 생성 (tikz)
  if (msg.type === 'create-plot') {
    const nodes: SceneNode[] = [];
    const eqFrame = figma.createNodeFromSvg(msg.eq);

    //위치
    eqFrame.x = figma.viewport.center.x;
    eqFrame.y = figma.viewport.center.y;

    nodes.push(eqFrame);

    //현재 페이지에 추가
    figma.currentPage.appendChild(eqFrame);

    //생성된 객체 선택
    figma.currentPage.selection = nodes;
    //생성된 객체로 viewport 이동 및 확대
    //figma.viewport.scrollAndZoomIntoView(nodes);
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  //figma.closePlugin();
};
