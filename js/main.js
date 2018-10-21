var arr = dataGenerator(3, 100)
window.onload=render(1,5);
window.onload=mainWindow();
var selectedDayId = new Date().getDate();

function daysInMonth(month) {
        return 32 - new Date(new Date().getFullYear(), month, 32).getDate();
    };

function mainWindow()
{
    var id = new Date().getDate()

    var grad = document.getElementById('span1' + id).
    textContent.substring(0, document.getElementById('span1' + id).textContent.length - 2)

    var day = getDay(id)

    document.getElementById('time').value = new Date().getHours();

    document.getElementById('main-temp-span').textContent = ` ${arr[id - 1][document.getElementById('time').value]}°C`

    document.getElementById('main-date-span').textContent = 
        `Харьков ${day} ${id}.${new Date().getMonth()+1}.18`

    document.getElementById('time').oninput = function() {
        document.getElementById('main-temp-span').textContent = ` ${arr[selectedDayId - 1][this.value]}°C`
        changeImage(document.getElementById('main-temp-span').textContent.trim().
            substring(0, document.getElementById('main-temp-span').textContent.trim().length - 2));
    }

    changeImage(grad)
}

function setCurDate() {
    var curDate = new Date()
    document.getElementById('date-month').value = 1 + curDate.getMonth();
    document.getElementById('date-year').value = 1900 + curDate.getYear();
}

function changeDate(direction) {
    var value = document.getElementById('date-month').value

    if (direction == 1) {
        document.getElementById('date-month').value = 1 + (12 + value) % 12
        if (document.getElementById('date-month').value == 1)
            document.getElementById('date-year').value = parseInt(document.getElementById('date-year').value) + 1
    }
    else {
        document.getElementById('date-month').value = 1 + (12 + value - 2) % 12
        if (document.getElementById('date-month').value == 12)
            document.getElementById('date-year').value = parseInt(document.getElementById('date-year').value) - 1
    }
}

function render(b, e) {
    var curDate = new Date()

    setCurDate()

    for(var i = b; i <= e; i++)
    {
        var d = document.createElement('div');
        d.id = i+'div';
        d.className = 'container w-75'
        document.body.appendChild(d);
        var
        row = document.createElement('div');
        row.id = i + 'row'
        row.className = 'row align-items-center'
        document.getElementById(i+'div').appendChild(row)
        for(var j = 1; j <= 7; j++) {
            var id = (i-1)*7 + j;

            if(id > daysInMonth(curDate.getMonth())) 
            {
                for(; j<= 7; j++)
                {
                    var bord = document.createElement('div')
                    bord.id = id
                    bord.className = 'col day next'
                    document.getElementById(i + 'row').appendChild(bord)  
                }
                break
            }

            var bord = document.createElement('div')
            bord.id = id

            if (bord.id == curDate.getDate())
                bord.className = 'col day active'
            else
                bord.className = 'col day'

            document.getElementById(i + 'row').appendChild(bord)                        

            var dataRow = document.createElement('div');
            dataRow.id = 'DatarRow' + id
            dataRow.className = 'row my-2'

            var span = document.createElement('div');
            span.className = 'mx-auto'
            span.appendChild(document.createTextNode(`${id}.${curDate.getMonth()+1}.18`))
            dataRow.appendChild(span)

            var InfoRow = document.createElement('div');
            InfoRow.id = 'InfoRow' + id
            InfoRow.className = 'row my-2'

            var ico = document.createElement('i');
            ico.id = 'month-ico'
            ico.className = 'wi wi-night-sleet mx-auto'

            var grad = document.createElement('span');
            grad.id = 'span1' + id
            grad.appendChild(document.createTextNode(` ${arr[id - 1][curDate.getHours()]}°C`))

            bord.appendChild(dataRow)
            bord.appendChild(InfoRow)
            InfoRow.appendChild(ico)
            ico.appendChild(grad)

            document.getElementById(id).onclick = function() { 
                mainInfoUpdate(this.id)
                selectedDayId = this.id  
                $('.col.day.active').removeClass('active')  
                $(this).addClass('active')
                $("#time").value = 12
            }
        }
    }          
}

function mainInfoUpdate(id, curDate)
{
    var curDate = new Date()
    document.getElementById('main-temp-span').textContent = ` ${arr[id - 1][document.getElementById('time').value]}°C`

    var day = getDay(id)
                
    var grad = arr[id - 1][document.getElementById('time').value]

    changeImage(grad)

    document.getElementById('main-date-span').textContent = 
    `Харьков ${day} ${id}.${curDate.getMonth() + 1}.18`
}

function getDay(id)
{
    switch (id % 7)
    {
        case 1:
            var day = 'Пн'
            break
        case 2:
            var day = 'Вт'
            break
        case 3:
            var day = 'Ср'
            break
        case 4:
            var day = 'Чт'
            break
        case 5:
            var day = 'Пт'
            break
        case 6:
            var day = 'Сб'
            break
        default:
            var day = 'Вс'
            break
    }
    return day
}

function changeImage(grad)
{
    var currHour = document.getElementById('time').value;
    if(currHour <= 4 ||  17 <= currHour)
    {
        if(grad >= 11)
        {
            document.getElementById('main-info').classList.remove("image-clouds")
            document.getElementById('main-info').classList.remove("image-night-rain")
            document.getElementById('main-info').classList.remove("image-sun")
            document.getElementById('main-info').classList.add("image-night")
        }
        else 
        {
            document.getElementById('main-info').classList.remove("image-clouds")
            document.getElementById('main-info').classList.remove("image-sun")
            document.getElementById('main-info').classList.remove("image-night")
            document.getElementById('main-info').classList.add("image-night-rain")
        }
    }
    else
    {
        if(grad >= 11)
        {
            document.getElementById('main-info').classList.remove("image-clouds")
            document.getElementById('main-info').classList.remove("image-night-rain")
            document.getElementById('main-info').classList.remove("image-night")
            document.getElementById('main-info').classList.add("image-sun")
        }
        else 
        {
            document.getElementById('main-info').classList.remove("image-sun")
            document.getElementById('main-info').classList.remove("image-night-rain")
            document.getElementById('main-info').classList.remove("image-night")
            document.getElementById('main-info').classList.add("image-clouds")
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function dataGenerator(min, max)
{
    var arr = [];
    for(var i = 0; i < 31; i++)
    {
        arr.push([]);
        for(var j = 0, minVal = min, maxVal = max; j < 25; j++)
        {
            arr[i].push(getRandomInt(minVal, maxVal));
            if(j < 14)
            {
                minVal++;
                if(j < 12)
                {
                    maxVal++;
                }
            }
            else if(j > 17)
            {
                minVal -= 2;
                maxVal -= 2 ;
            }
        }
    }
    return arr;
}
