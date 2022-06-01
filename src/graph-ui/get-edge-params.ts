import {Node} from 'react-flow-renderer';

/**
 * Returns the intersection point of the line between the center of the
 * intersectionNode and the target node
 */
function getNodeIntersection(intersectionNode: Node, targetNode: Node) {
    const {
        width: intersectionNodeWidth,
        height: intersectionNodeHeight,
        position: intersectionNodePosition,
    } = intersectionNode;
    const targetPosition = targetNode.position;

    const w = (intersectionNodeWidth ?? 0) / 2;
    const h = (intersectionNodeHeight ?? 0) / 2;

    const tw = (targetNode.width ?? 0) / 2;
    const th = (targetNode.height ?? 0) / 2;

    const x2 = intersectionNodePosition.x + w;
    const y2 = intersectionNodePosition.y + h;
    const x1 = targetPosition.x + tw;
    const y1 = targetPosition.y + th;

    const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
    const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
    const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
    const xx3 = a * xx1;
    const yy3 = a * yy1;
    const x = w * (xx3 + yy3) + x2;
    const y = h * (-xx3 + yy3) + y2;

    return { x, y };
}

/**
 * Returns edge starting and ending points based on the intersection with its
 * nodes
 * @param source node
 * @param target node
 */
export function getEdgeParams(source: Node, target: Node) {
    const sourceIntersectionPoint = getNodeIntersection(source, target);
    const targetIntersectionPoint = getNodeIntersection(target, source);

    return {
        sx: sourceIntersectionPoint.x,
        sy: sourceIntersectionPoint.y,
        tx: targetIntersectionPoint.x,
        ty: targetIntersectionPoint.y,
    };
}
