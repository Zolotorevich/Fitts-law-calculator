//create draggable object
//new DragObject(DOMobj);

var dragMaster = (function() {

    var dragObject
    var mouseDownAt

	var currentDropTarget

	
	function mouseDown(e) {
		e = fixEvent(e)
		if (e.which!=1) return

 		mouseDownAt = { x: e.pageX, y: e.pageY, element: this }

		addDocumentEventHandlers()

		return false
	}


	function mouseMove(e){
		e = fixEvent(e)

		// (1)
		if (mouseDownAt) {
			if (Math.abs(mouseDownAt.x-e.pageX)<5 && Math.abs(mouseDownAt.y-e.pageY)<5) {
				return false
			}
			// ������ �������
			var elem  = mouseDownAt.element
			// ������� ������ ��� ��������
			dragObject = elem.dragObject
			
			// ���������, � ����� ������������� ��������� ������� �������
			var mouseOffset = getMouseOffset(elem, mouseDownAt.x, mouseDownAt.y)
			mouseDownAt = null // ����������� �������� ������ �� �����, ����� ��� ��������
			
			dragObject.onDragStart(mouseOffset) // ������
			
		}

		// (2)
		dragObject.onDragMove(e.pageX, e.pageY)
		
		// (3)
		var newTarget = getCurrentTarget(e)
		
		// (4)
		if (currentDropTarget != newTarget) {
			if (currentDropTarget) {
				currentDropTarget.onLeave()
			}
			if (newTarget) {
				newTarget.onEnter()
			}
			currentDropTarget = newTarget

		}
		
		// (5)
		return false
    }
	
	
    function mouseUp(){
		if (!dragObject) { // (1)
			mouseDownAt = null
		} else {
			// (2)
			if (currentDropTarget) {
				currentDropTarget.accept(dragObject)
				dragObject.onDragSuccess(currentDropTarget)
			} else {
				dragObject.onDragFail()
			}

			dragObject = null
		}

		// (3)
		removeDocumentEventHandlers()
    }


	function getMouseOffset(target, x, y) {
		var docPos	= getOffset(target)
		return {x:x - docPos.left, y:y - docPos.top}
	}

	
	function getCurrentTarget(e) {

		
		if (navigator.userAgent.match('MSIE') || navigator.userAgent.match('Gecko')) {
			var x=e.clientX, y=e.clientY
		} else {
			var x=e.pageX, y=e.pageY
		}
		// ����� �� ���� ������� ������� - ����������� ������ ����� �� hide �� show
		// dragObject.hide()
		var elem = document.elementFromPoint(x,y)
		// dragObject.show()
		
		// ����� ����� ��������� dropTarget
		while (elem) {
			// ������� ����� ������� dragObject 
			if (elem.dropTarget && elem.dropTarget.canAccept(dragObject)) {
				return elem.dropTarget
			}
			elem = elem.parentNode
		}
		
		// dropTarget �� �����
		return null
	}


	function addDocumentEventHandlers() {
		document.onmousemove = mouseMove
		document.onmouseup = mouseUp
		document.ondragstart = document.body.onselectstart = function() {return false}
	}
	function removeDocumentEventHandlers() {
		document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = null
	}


    return {

		makeDraggable: function(element){
			element.onmousedown = mouseDown
		}
    }
}())

function DragObject(element) {
	element.dragObject = this;
	
	dragMaster.makeDraggable(element);
	
	var rememberPosition;
	var mouseOffset;
	
	this.onDragStart = function(offset) {		
		mouseOffset = offset;
		var s = element.style;
		s.position = 'absolute';
		
	}
	
	this.onDragMove = function(x, y) {
		element.style.top =  y - mouseOffset.y +'px';
		element.style.left = x - mouseOffset.x +'px';
		//added fitts'
		line.position();
		lineB.position();
		fitts();
	}
	
	this.onDragSuccess = function(dropTarget) {}
	
	this.onDragFail = function() {	}
	
	this.toString = function() {
		return element.id;
	}
}

function fixEvent(e) {
	// �������� ������ ������� ��� IE
	e = e || window.event

	// �������� pageX/pageY ��� IE
	if ( e.pageX == null && e.clientX != null ) {
		var html = document.documentElement
		var body = document.body
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
	}

	// �������� which ��� IE
	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
	}

	return e
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
 
    var body = document.body
    var docElem = document.documentElement
 
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
 
    return { top: Math.round(top), left: Math.round(left) }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent        
    }
 
    return {top: top, left: left}
}