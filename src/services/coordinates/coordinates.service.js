export const getSelectorCoordinates = function (selector, parentSelector) {
  const response = {
    success: false,
    $element: null,
  };
  try {
    const $element = document.querySelector(selector);
    const $parent = document.querySelector(parentSelector);
    const $elementBoundingClientRect = $element.getBoundingClientRect();
    response.$element = $element;
    response.success = true;

    response.coordinates = {
      x0: $elementBoundingClientRect.left + $parent.scrollLeft,
      x1:
        $elementBoundingClientRect.left +
        $elementBoundingClientRect.width +
        $parent.scrollLeft,
      y0: $elementBoundingClientRect.top + $parent.scrollTop,
      y1:
        $elementBoundingClientRect.top +
        $elementBoundingClientRect.height +
        $parent.scrollTop,
      height: $elementBoundingClientRect.height,
      width: $elementBoundingClientRect.width,
    };
  } catch (ex) {
    response = {
      success: false,
      $element: null,
    };
  }
  return response;
};

export const computeElementCoordinates = function (selector, experience) {
  let $element = selector;
  if (typeof selector === "string") {
    $element = document.querySelector(selector);
  }
  const rect = $element.getBoundingClientRect();
  const px = {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
    w: rect.width,
    h: rect.height,
  };
  const rel = {
    x: (px.x - window.innerWidth / 2) / experience.viewportFactor,
    y: (window.innerHeight / 2 - px.y) / experience.viewportFactor,
    w: px.w / experience.viewportFactor,
    h: px.h / experience.viewportFactor,
  };
  return {
    px,
    rel,
  };
};

export const computeElementGeometryCoordinates = function (
  elementCoordinates,
  experienceMeasurements
) {
  const px = {
    x: elementCoordinates.x0,
    y: elementCoordinates.y0,
    w: elementCoordinates.width,
    h: elementCoordinates.height,
    size: {
      width: elementCoordinates.width,
      height: elementCoordinates.height
    },
    center: {
      x:elementCoordinates.x0 +elementCoordinates.width / 2,
      //x: - document.body.clientWidth/2 + elementCoordinates.x0 +elementCoordinates.width/8, //elementCoordinates.width/4, //- elementCoordinates.width / 2 
      y: elementCoordinates.y0 + elementCoordinates.height/2//  - experienceMeasurements.heightPx/2,
    //  y: - document.body.clientHeight/2 + elementCoordinates.y0 + elementCoordinates.width/2
    },
  };

  const rel = {
    x: (px.center.x - experienceMeasurements.widthPx/2) /experienceMeasurements.viewportFactor,// - experienceMeasurements.widthRel /2,//( document.body.clientWidth/2  +100)/experienceMeasurements.viewportFactor,//(px.center.x) / experienceMeasurements.viewportFactor,
    y: (px.center.y -experienceMeasurements.heightPx/2) / experienceMeasurements.viewportFactor,
    w: px.size.width * experienceMeasurements.widthPxToRel,
    h: px.size.height * experienceMeasurements.heightPxToRel,
    vpf:experienceMeasurements.viewportFactor
  };

  return {
    px,
    rel,
  };
};
export const computeGeometryMeasurements = function (geometry) {
  geometry.computeBoundingBox();
  
};
/*
    const computeRelativePosition = function (
    x = 0,
    y = 0,
    w = 1,
    h = 1,
    geometry,
    position
  ) {
    console.log({ h, viewportFactor });

    // 0,0,0 -> center of viewport
    let geometryOffsetX = geometry.boundingBox.max.x;
    let geometryOffsetY = geometry.boundingBox.min.y;
    if (position == "top-left-center") {
      geometryOffsetX = 0;
      geometryOffsetY = 0;
    } else if (position == "center-out") {
      geometryOffsetY = geometry.boundingBox.max.y;
      // geometryOffsetY = geometry.boundingBox.min.y - h/2/viewportFactor
      y = y + h / 2;
    }

    const leftRel = -widthRel / 2 + geometryOffsetX + x / viewportFactor;
    const topRel = heightRel / 2 + geometryOffsetY - y / viewportFactor;
    return { y: topRel, x: leftRel };
  };
  const computeElementCoordinates = function (selector) {
    let $element = selector;
    if (typeof selector === "string") {
      $element = document.querySelector(selector);
    }
    const rect = $element.getBoundingClientRect();

    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      w: rect.width,
      h: rect.height,
    };
  };
  const computeRelativePositionToElement = function (
    selector,
    geometry,
    position = "center-out"
  ) {
    geometry.computeBoundingBox();
    const { x, y, w, h } = computeElementCoordinates(selector);
    console.log({ x, y, w, h });
    return computeRelativePosition(x, y, w, h, geometry, position);
  };

  */

export const createDiv = function (coordinates) {
  const $div = document.createElement("div");
  $div.style.position = "absolute";
  $div.style.top = coordinates.y0 + "px";
  $div.style.left = coordinates.x0 + "px";
  $div.style.height = coordinates.height + "px";
  $div.style.width = coordinates.width + "px";
  $div.style.backgroundColor = "#FF0000";
  $div.style.zIndex = 100;
  document.body.appendChild($div);
};
