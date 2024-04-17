const positiveCases = [];
const deathConfirmed = [];
const hospitalized = [];
const dateArray = [];
const dateRecordedArray = [];
$(document).ready(function () {
	// const positiveCases = [];
	let deathConfirmed = [];
	let dateRecorded = "";
	let dates = "";

	$.ajax({
		async: true,
		crossDomain: true,
		url: "https://api.covidtracking.com/v2/us/daily.json",
		method: "GET",
	}).done(function (response) {
		data = response.data;
		console.log(response);

		for (key in data) {
			const ctx = data[key];
			const states = ctx.states;
			const positiveChange = ctx.cases.total.calculated.change_from_prior_day;
			const deatherConfirmedChange =
				ctx.outcomes.death.total.calculated.change_from_prior_day;
			const hospitalizedChange = ctx.outcomes.hospitalized.currently.value;
			if (states == 56) {
				dateRecorded = ctx.date;
				dateRecordedArray.unshift(dateRecorded);
				for (idx in dateRecordedArray) {
					// if (dateRecorded.match("2021-03")) {
					if (dateRecorded.match(dateRecordedArray[idx])) {
						dateArray.unshift(dateRecorded);
						positiveCases.unshift(positiveChange);
						//positiveCases.unshift(ctx.cases.total.value);
						deathConfirmed.unshift(deatherConfirmedChange);
						//deathConfirmed.unshift(ctx.outcomes.death.total.value);
						hospitalized.unshift(hospitalizedChange);
					}
				}
			}
		}
		createHighchart(positiveCases, deathConfirmed);
	});
});

function createHighchart(positiveCases, deathConfirmed) {
	Highcharts.chart("container", {
		colors: ["#058DC7", "#ED561B", "#50B432"],
		chart: {
			type: "line",
		},
		title: {
			text: "U.S COVID Test Cases",
			align: "left",
		},

		yAxis: {
			title: {
				text: "Number of cases",
			},
		},

		xAxis: {
			categories: dateArray,

			accessibility: {
				rangeDescription: "Date Range: 2020 to 2021",
			},
		},

		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "middle",
		},

		plotOptions: {
			series: {
				label: {
					connectorAllowed: false,
				},
				//pointStart: ,
			},
		},

		series: [
			{
				name: "Positive Test Cases",
				data: positiveCases,
			},
			{
				name: "Deaths",
				data: deathConfirmed,
			},
			{
				name: "Hospitalizezd",
				data: hospitalized,
			},
		],

		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 500,
					},
					chartOptions: {
						legend: {
							layout: "horizontal",
							align: "center",
							verticalAlign: "bottom",
						},
					},
				},
			],
		},
	});
}
