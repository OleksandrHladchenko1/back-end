module.exports = (body) => {
  const data = JSON.parse(body);
  console.log(data);

  const issues = data.issues.map((visit, i) => {
    const dateStart = new Date(visit.startTime);
    const dateEnd = new Date(visit.endTime);
    const start = `${dateStart.getDate()}.${dateStart.getUTCMonth() + 1 < 10 ? `0${dateStart.getUTCMonth() + 1}` : dateStart.getUTCMonth() + 1}.${dateStart.getFullYear()} ${dateStart.getHours() < 10 ? `0${dateStart.getHours()}` : dateStart.getHours()}:${dateStart.getMinutes() < 10 ? `0${dateStart.getMinutes()}` : dateStart.getMinutes()}`;
    const end = `${dateEnd.getDate()}.${dateEnd.getUTCMonth() + 1 < 10 ? `0${dateEnd.getUTCMonth() + 1}` : dateEnd.getUTCMonth() + 1}.${dateEnd.getFullYear()} ${dateEnd.getHours() < 10 ? `0${dateEnd.getHours()}` : dateEnd.getHours()}:${dateEnd.getMinutes() < 10 ? `0${dateEnd.getMinutes()}` : dateEnd.getMinutes()}`;

    return (
      `<li><b>${visit.description}</b>, 
    ця проблема буде виконана з <b>${start}</b> по <b>${end}</b>. 
    <b>Ціна ремонту складає ${visit.price} грн;</b></li>`
    );
  });
  
  const total = data.issues.reduce((sum, current) => sum + +current.price, 0);
  const date = new Date(data.issues[0].startTime);
  const concatDate = `${date.getDate()}.${date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1}.${date.getFullYear()}р.`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container {
            padding: 30px;
          }
          h1::before {
            position: absolute;
            top: 100%;
            left: 0;
            content: "";
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, rgb(93, 0, 255), rgb(76, 208, 215));
          }
          h1,
          .car-title,
          .user-title,
          .visit-title {
            position: relative;
            text-align: center;
            padding: 7px 0;
          }
          .car-info,
          .user-info,
          .visit-info {
            padding: 0 100px;
          }
          .model-name,
          .year-color,
          .engine-trans,
          .numbers {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }
          .user-info-elem {
            padding: 5px 0;
          }
          .car-info-elem {
            color: rgb(89, 91, 92);
          }
          .car-info-text {
            color: black;
            border-bottom: 1px solid black;
          }
          .total-text {
            margin: 20px;
            text-align: center;
          }
          ul {
            text-align: justify;
          }
          li,
          .visit-info-title {
            font-size: 1.2em;
          }
          .date {
            float: left;
          }
          .sign {
            float: right;
          }
          .date-sign {
            padding: 150px;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <div class="title">
            <h1 class="title-text">Договір про ремонт</h1>
          </div>
          <div class="car">
            <h2 class="car-title">Інформація про автомобіль</h2>
            <div class="car-info">
              <div class="model-name">
                <h3 class="car-info-elem">Назва: <span class="car-info-text">${data.car.name}</span></h3>
              </div>
              <div class="numbers">
                <h3 class="car-info-elem">Номер авто: <span class="car-info-text">${data.car.number}</span></h3>
                <h3 class="car-info-elem">Номер двигуна: <span class="car-info-text">${data.car.engineNumber}</span></h3>
              </div>
              <div class="year-color">
                <h3 class="car-info-elem">Рік: <span class="car-info-text">${data.car.year}</span></h3>
                <h3 class="car-info-elem">Колір: <span class="car-info-text">${data.car.color}</span></h3>
              </div>
              <div class="engine-trans">
                <h3 class="car-info-elem">Тип двигуна: <span class="car-info-text">${data.car.engine}</span></h3>
                <h3 class="car-info-elem">Тип трансмісії: <span class="car-info-text">${data.car.transmission}</span></h3>
              </div>
            </div>
          </div>
          <div class="user">
            <h2 class="user-title">Інформація про клієнта</h2>
            <div class="user-info">
              <h3 class="user-info-elem car-info-elem">ПІБ: <span class="car-info-text">${data.user.fullName}</span></h3>
              <h3 class="user-info-elem car-info-elem">Номер телефону: <span class="car-info-text">${data.user.phoneNumber}</span></h3>
              <h3 class="user-info-elem car-info-elem">Електронна пошта: <span class="car-info-text">${data.user.email}</span></h3>
            </div>
          </div>
          <div class="visit">
            <h2 class="visit-title">Інформація про візит</h2>
            <div class="visit-info">
              <p class="visit-info-title">Під час візиту, що відбувся ${data.visit.dateOfVisit}, було знайдено наступні проблеми:</p>
              <ul>
                ${issues}
              </ul>
            </div>
          </div>
          <div class="total">
            <h2 class="total-text">Загальна сума ремонту: ${total} грн</h2>
          </div>
          <div class="date-sign">
            <h2 class="date">${concatDate}</h2>
            <p class="sign">Підпис</p>
          </div>
        </div>
      </body>
    </html>
    `;
};
