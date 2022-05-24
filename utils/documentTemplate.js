module.exports = (body) => {
  const data = JSON.parse(body);
  console.log(data);

  const issues = data.issues.map((visit, i) => `<li><b>${visit.description}</b>, 
    this issue will be fixed by <b>${visit.firstName} ${visit.lastName} ${visit.fatherName}</b>, 
    who is the <b>${visit.name}</b>, with <b>${visit.experience} year(s) experience</b>, from <b>${visit.startTime}</b> to <b>${visit.endTime}</b>. 
    <b>It will cost ${visit.price} UAH</b></li>`
  );

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
        </style>
      </head>
      
      <body>
        <div class="container">
          <div class="title">
            <h1 class="title-text">CTO Document</h1>
          </div>
          <div class="car">
            <h2 class="car-title">Car info</h2>
            <div class="car-info">
              <div class="model-name">
                <h3 class="car-info-elem">Name: <span class="car-info-text">${data.car.name}</span></h3>
              </div>
              <div class="numbers">
                <h3 class="car-info-elem">Car number: <span class="car-info-text">${data.car.number}</span></h3>
                <h3 class="car-info-elem">Engine number: <span class="car-info-text">${data.car.engineNumber}</span></h3>
              </div>
              <div class="year-color">
                <h3 class="car-info-elem">Year: <span class="car-info-text">${data.car.year}</span></h3>
                <h3 class="car-info-elem">Color: <span class="car-info-text">${data.car.color}</span></h3>
              </div>
              <div class="engine-trans">
                <h3 class="car-info-elem">Engine type: <span class="car-info-text">${data.car.engine}</span></h3>
                <h3 class="car-info-elem">Transmission type: <span class="car-info-text">${data.car.transmission}</span></h3>
              </div>
            </div>
          </div>
          <div class="user">
            <h2 class="user-title">Client info</h2>
            <div class="user-info">
              <h3 class="user-info-elem car-info-elem">Full name: <span class="car-info-text">${data.user.fullName}</span></h3>
              <h3 class="user-info-elem car-info-elem">Phone number: <span class="car-info-text">${data.user.phoneNumber}</span></h3>
              <h3 class="user-info-elem car-info-elem">E-mail: <span class="car-info-text">${data.user.email}</span></h3>
            </div>
          </div>
          <div class="visit">
            <h2 class="visit-title">Visit info</h2>
            <div class="visit-info">
              <p class="visit-info-title">In scope of this visit, which is on ${data.visit.dateOfVisit}, we found the next issues:</p>
              <ul>
                ${issues}
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
};
