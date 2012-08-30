/**********************************************************************************
*	Function	:	openWindow
*	
*	Description	:	Opens a new browser window
*
*	Arguments	:	width,height,href,target
*
***********************************************************************************/

function openWindow(b,h,ziel,fenster)
{
	var x=(screen.width-b)/2;
	var y=(screen.height-h)/2;
	var opt='resizable=1,location=0,directories=0,status=0,menubar=0,scrollbars=1,toolbar=0,width='+b+',height='+h+',screenX='+x+',screenY='+y+',left='+x+',top='+y;
	window.open(ziel,fenster,opt);
}

/**********************************************************************************
*	Function	:	changeImage
*	
*	Description	:	Makes the mouseover effect on images for all navigation
*
*	Arguments	:	imgsrc, name
*
***********************************************************************************/

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/**********************************************************************************
 *	FUNCTION	:	setPointer	
 *
 * 	Sets/unsets the pointer in browse mode
 *
 * 	@param   object   the table row
 * 	@param   object   the color to use for this row
 * 	@param   object   the background color
 *
 * 	@return  boolean  whether pointer is set or not
***********************************************************************************/

/**
 * This array is used to remember mark status of rows in browse mode
 */
var marked_row = new Array;

function setPointer(theRow, theRowNum, theAction, theDefaultColor, thePointerColor, theMarkColor)
{
    var theCells = null;

    // 1. Pointer and mark feature are disabled or the browser can't get the
    //    row -> exits
    if ((thePointerColor == '' && theMarkColor == '')
        || typeof(theRow.style) == 'undefined') {
        return false;
    }

    // 2. Gets the current row and exits if the browser can't get it
    if (typeof(document.getElementsByTagName) != 'undefined') {
        theCells = theRow.getElementsByTagName('td');
    }
    else if (typeof(theRow.cells) != 'undefined') {
        theCells = theRow.cells;
    }
    else {
        return false;
    }

    // 3. Gets the current color...
    var rowCellsCnt  = theCells.length;
    var domDetect    = null;
    var currentColor = null;
    var newColor     = null;
    // 3.1 ... with DOM compatible browsers except Opera that does not return
    //         valid values with "getAttribute"
    if (typeof(window.opera) == 'undefined'
		&& typeof(theCells[0].getAttribute) != 'undefined') {
        currentColor = theCells[0].getAttribute('bgcolor');
		domDetect    = true;
    }
    // 3.2 ... with other browsers
    else {
        currentColor = theCells[0].style.backgroundColor;
		domDetect    = false;
    } // end 3

    // 4. Defines the new color
    // 4.1 Current color is the default one
    if (!currentColor
        || currentColor.toLowerCase() == theDefaultColor.toLowerCase()) {
        if (theAction == 'over' && thePointerColor != '') {
            newColor              = thePointerColor;
        }
        else if (theAction == 'click' && theMarkColor != '') {
            newColor              = theMarkColor;
        }
    }
    // 4.1.2 Current color is the pointer one
    else if (currentColor.toLowerCase() == thePointerColor.toLowerCase()
             && (typeof(marked_row[theRowNum]) == 'undefined' || !marked_row[theRowNum])) {
        if (theAction == 'out') {
            newColor              = theDefaultColor;
        }
        else if (theAction == 'click' && theMarkColor != '') {
            newColor              = theMarkColor;
            marked_row[theRowNum] = true;
        }
    }
    // 4.1.3 Current color is the marker one
    else if (currentColor.toLowerCase() == theMarkColor.toLowerCase()) {
        if (theAction == 'click') {
            newColor              = (thePointerColor != '')
                                  ? thePointerColor
                                  : theDefaultColor;
            marked_row[theRowNum] = (typeof(marked_row[theRowNum]) == 'undefined' || !marked_row[theRowNum])
                                  ? true
                                  : null;
        }
    } // end 4

    // 5. Sets the new color...
    if (newColor) {
        var c = null;
        // 5.1 ... with DOM compatible browsers except Opera
        if (domDetect) {
            for (c = 0; c < rowCellsCnt; c++) {
                theCells[c].setAttribute('bgcolor', newColor, 0);
            } // end for
        }
        // 5.2 ... with other browsers
        else {
            for (c = 0; c < rowCellsCnt; c++) {
                theCells[c].style.backgroundColor = newColor;
            }
        }
    } // end 5

    return true;
} // end of the 'setPointer()' function

/**********************************************************************************
*	FUNCTION	:	changeTwoFrames
*	
*	changes two frames clicking a link
*
* 	@param URI1,F1,URI2,F2
*
* 	@return  
***********************************************************************************/
function changeTwoFrames(URI1,F1,URI2,F2) 
{
    Frame1=eval("parent."+F1);
    Frame2=eval("parent."+F2);
    Frame1.location.href = URI1;
    Frame2.location.href = URI2;
}
 
/**********************************************************************************
*	FUNCTION	:	changeThreeFrames
*	
*	changes three frames ckicking a link
*
* 	@param URI1,F1,URI2,F2,URI3,F3
*
* 	@return  
***********************************************************************************/
function changeThreeFrames(URI1,F1,URI2,F2,URI3,F3) 
{
    Frame1=eval("parent."+F1);
    Frame2=eval("parent."+F2);
    Frame3=eval("parent."+F3);
    Frame1.location.href = URI1;
    Frame2.location.href = URI2;
    Frame3.location.href = URI3;
}

/**********************************************************************************
*	FUNCTION	:	changeFourFrames
*	
*	changes four frames ckicking a link
*
* 	@param URI1,F1,URI2,F2,URI3,F3,URI4,F4
*
* 	@return  
***********************************************************************************/
function changeFourFrames(URI1,F1,URI2,F2,URI3,F3,URI4,F4) 
{
    Frame1=eval("parent."+F1);
    Frame2=eval("parent."+F2);
    Frame3=eval("parent."+F3);
    Frame4=eval("parent."+F4);
    Frame1.location.href = URI1;
    Frame2.location.href = URI2;
    Frame3.location.href = URI3;
    Frame4.location.href = URI4;
}

/**********************************************************************************
*	FUNCTION	:	changeFiveFrames
*	
*	changes five frames ckicking a link
*
* 	@param
*
* 	@return  
***********************************************************************************/
function changeFiveFrames(URI1,F1,URI2,F2,URI3,F3,URI4,F4,URI5,F5) 
{
    Frame1=eval("parent."+F1);
    Frame2=eval("parent."+F2);
    Frame3=eval("parent."+F3);
    Frame4=eval("parent."+F4);
    Frame5=eval("parent."+F5);
    Frame1.location.href = URI1;
    Frame2.location.href = URI2;
    Frame3.location.href = URI3;
    Frame4.location.href = URI4;
    Frame5.location.href = URI5;
}

/**********************************************************************************
*	FUNCTION	:	changeSixFrames
*	
*	changes six frames ckicking a link
*
* 	@param URI1,F1,URI2,F2,URI3,F3,URI4,F4,URI5,F5,URI6,F6
*
* 	@return  
***********************************************************************************/
function changeSixFrames(URI1,F1,URI2,F2,URI3,F3,URI4,F4,URI5,F5,URI6,F6) 
{
    Frame1=eval("parent."+F1);
    Frame2=eval("parent."+F2);
    Frame3=eval("parent."+F3);
    Frame4=eval("parent."+F4);
    Frame5=eval("parent."+F5);
    Frame6=eval("parent."+F6);
    Frame1.location.href = URI1;
    Frame2.location.href = URI2;
    Frame3.location.href = URI3;
    Frame4.location.href = URI4;
    Frame5.location.href = URI5;
    Frame6.location.href = URI6;
}

/**********************************************************************************
*	FUNCTION	:	changeSevenFrames
*	
*	changes seven frames ckicking a link
*
* 	@param URI1,F1,URI2,F2,URI3,F3,URI4,F4,URI5,F5,URI6,F6,URI7,F7
*
* 	@return  
***********************************************************************************/
function changeSevenFrames(URI1,F1,URI2,F2,URI3,F3,URI4,F4,URI5,F5,URI6,F6,URI7,F7) 
{
    Frame1=eval("parent."+F1);
    Frame2=eval("parent."+F2);
    Frame3=eval("parent."+F3);
    Frame4=eval("parent."+F4);
    Frame5=eval("parent."+F5);
    Frame6=eval("parent."+F6);
    Frame7=eval("parent."+F7);
    Frame1.location.href = URI1;
    Frame2.location.href = URI2;
    Frame3.location.href = URI3;
    Frame4.location.href = URI4;
    Frame5.location.href = URI5;
    Frame6.location.href = URI6;
    Frame7.location.href = URI7;
}

/**
 * Checks/unchecks all tables
 *
 * @param   string   the form name
 * @param   boolean  whether to check or to uncheck the element
 *
 * @return  boolean  always true
 */
function setCheckboxes(the_form, do_check)
{
    var elts      = (typeof(document.forms[the_form].elements['selected_db[]']) != 'undefined')
                  ? document.forms[the_form].elements['selected_db[]']
                  : document.forms[the_form].elements['selectedTour[]'];
    var elts_cnt  = (typeof(elts.length) != 'undefined')
                  ? elts.length
                  : 0;

    if (elts_cnt) {
        for (var i = 0; i < elts_cnt; i++) {
            elts[i].checked = do_check;
        } // end for
    } else {
        elts.checked        = do_check;
    } // end if... else

    return true;
} // end of the 'setCheckboxes()' function