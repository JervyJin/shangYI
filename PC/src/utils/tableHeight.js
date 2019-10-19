import $ from "jquery";
const tableHeight = function (id) {
  console.log("join ");
  var xdheight = 0;
  var duheight = $(document).height();
  $("#grid").siblings("div,p").each(function () {
    var item = $(this).height();
    xdheight += item;
  });
  //this.gridHeight = duheight - 121 - xdheight;
  return duheight - 141 - xdheight;
}
export default tableHeight;
