// Keep all your existing Highcharts & DataTable JS logic here unchanged
let dataTable, budgetChart, yearlyChart, pieChart, forecastChart;

function renderBudgetChart(data){ /* ... */ }
function renderYearlyChart(data){ /* ... */ }
function renderPieChart(data){ /* ... */ }
function renderForecastChart(data, meta){ /* ... */ }
function renderTable(data){ /* ... */ }
function getFilters(){ /* ... */ }
function updateDashboard(year='', quarter='', department=''){ /* ... */ }

$(document).ready(function(){
    const filters = getFilters();
    updateDashboard(filters.year, filters.quarter, filters.department);
    $('#filterBtn').click(function(){
        const f = getFilters();
        updateDashboard(f.year, f.quarter, f.department);
    });
});

function renderBudgetChart(data) {
    const categories = data.map(d => `${d.department} Q${d.quarter} ${d.year}`);
    const allocatedData = data.map(d => d.allocated);
    const spentData = data.map(d => d.spent);

    if (budgetChart) budgetChart.destroy();
    budgetChart = Highcharts.chart('budgetChart', {
        chart: { type: 'column' },
        title: { text: 'Actuals: Allocated vs Spent by Department & Quarter' },
        xAxis: { categories, crosshair:true },
        yAxis: { min:0, title:{ text:'Amount (R)' } },
        tooltip: { shared:true, valueDecimals:2, valuePrefix:'R ' },
        series:[
            { name:'Allocated', data:allocatedData, color:'#2f7ed8' },
            { name:'Spent', data:spentData, color:'#f45b5b' }
        ]
    });
}

function renderYearlyChart(data) {
    const categories = data.map(d => d.year);
    const allocated = data.map(d => d.allocated);
    const spent = data.map(d => d.spent);

    if (yearlyChart) yearlyChart.destroy();
    yearlyChart = Highcharts.chart('yearlyChart', {
        chart: { type:'line' },
        title: { text:'Trend: Allocated vs Spent per Year' },
        xAxis: { categories },
        yAxis: { min:0, title:{ text:'Amount (R)' } },
        tooltip: { shared:true, valueDecimals:2, valuePrefix:'R ' },
        series:[
            { name:'Allocated', data:allocated, color:'#2f7ed8' },
            { name:'Spent', data:spent, color:'#f45b5b' }
        ]
    });
}

function renderPieChart(data) {
    if (pieChart) pieChart.destroy();
    pieChart = Highcharts.chart('pieChart', {
        chart:{ type:'pie' },
        title:{ text:'Spent by Department (current filter)' },
        tooltip:{ pointFormat:'{series.name}: <b>R {point.y:.2f}</b>' },
        series:[{ name:'Spent', colorByPoint:true, data:data }]
    });
}

function renderForecastChart(data, meta) {
    const categories = data.map(d => d.department);
    const forecast = data.map(d => d.forecast_spent);
    const nextAlloc = data.map(d => d.allocation_next);

    if (forecastChart) forecastChart.destroy();
    forecastChart = Highcharts.chart('forecastChart', {
        chart: { type: 'column' },
        title: { text: `Forecast: Next Quarter (Q${meta.next_quarter} ${meta.next_year})` },
        xAxis: { categories },
        yAxis: { min: 0, title: { text: 'Amount (R)' } },
        tooltip: { shared: true, valueDecimals: 2, valuePrefix: 'R ' },
        series: [
            { name: 'Forecast Spent', data: forecast, color: '#7cb5ec' },
            { name: 'Next Allocation', data: nextAlloc, color: '#90ed7d' }
        ]
    });

    const anyOver = data.some(d => d.overspend);
    const list = data.filter(d => d.overspend).map(d => d.department).join(', ');
    document.getElementById('forecastMeta').innerText = anyOver
        ? `⚠️ Overspend risk in: ${list}`
        : 'No overspend risk detected (forecast ≤ allocation).';
}

function renderTable(data){
    if (dataTable) dataTable.destroy();

    let tbody = '';
    data.forEach(d=>{
        tbody += `<tr>
            <td>${d.department}</td>
            <td>${d.year}</td>
            <td>${d.quarter}</td>
            <td>${d.allocated.toFixed(2)}</td>
            <td>${d.spent.toFixed(2)}</td>
            <td>${d.remaining.toFixed(2)}</td>
        </tr>`;
    });
    $('#tableBody').html(tbody);

    dataTable = $('#budgetTable').DataTable({
        pageLength: 10,
        lengthMenu: [[10,25,50,100,200,-1],[10,25,50,100,200,"All"]],
    });
}

function getFilters(){
    return {
        year: $('#yearFilter').val(),
        quarter: $('#quarterFilter').val(),
        department: $('#departmentFilter').val()
    };
}

function updateDashboard(year='', quarter='', department=''){
    $.ajax({
        url: "{% url 'dashboard:dashboard_view' %}",
        data: { year, quarter, department },
        dataType: 'json',
        success: function(res){
            $('#totalAllocated').text(res.total_allocated.toFixed(2));
            $('#totalSpent').text(res.total_spent.toFixed(2));
            $('#totalRemaining').text(res.total_remaining.toFixed(2));

            renderTable(res.dashboard_data);
            renderBudgetChart(res.dashboard_data);
            renderYearlyChart(res.yearly_chart);
            renderPieChart(res.pie_chart);
            renderForecastChart(res.forecast_chart, res.forecast_meta);
        }
    });
}
