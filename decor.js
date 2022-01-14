function linesInFormula() {

	lineColor = 'rgba(220, 233, 246, 0.2)'

	lineMT = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleMT')),
		document.getElementById('formulaInputMT'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto',
	  });
	
	lineA = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleA')),
		document.getElementById('formulaInputA'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	  });

	lineA = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleAS')),
		document.getElementById('formulaInputA'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	  });
	
	lineB = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleB')),
		document.getElementById('formulaInputB'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	  });

	lineID = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleID')),
		document.getElementById('formulaInputID'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	  });

	lineD = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleD')),
		document.getElementById('formulaInputD'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	  });

	lineW = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleW')),
		document.getElementById('formulaInputW'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	  });

	lineRatio = new LeaderLine(
		LeaderLine.pointAnchor(document.getElementById('formulaCircleRatio')),
		document.getElementById('formulaInputRatio'),
	{
		startPlug: 'behind',
		endPlug: 'behind',
		color: lineColor,
		size: 1,
		path: 'straight',
		startSocket: 'auto',
		endSocket: 'auto'
	  });

}
