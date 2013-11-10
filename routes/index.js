
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Webcam Space Invaders' });
};