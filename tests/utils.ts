const date = new Date();

export const startDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);

let day = startDate.getDate();
console.log("day--", day)

if ( day === 0 ) {
  startDate.setDate(startDate.getDate() + 1 )
}
if ( day === 2 ) {
  startDate.setDate(startDate.getDate() + 1 )
}
if ( day === 6 ) {
  startDate.setDate(startDate.getDate() + 2 )
}

export const endDate = new Date(startDate.getTime() + (30 * 60) * 1000);

// export const startDate1 = new Date(date.getTime() + (30 * 30 * 24 * 10) * 1000);
// export const endDate1 = new Date(startDate1.getTime() + (30 * 30) * 1000);

// const weekday = ["Monday","Wednesday","Thursday","Friday"];

// const d = new Date();
// let daay = weekday[d.getDay()];
// console.log("day--",daay)
