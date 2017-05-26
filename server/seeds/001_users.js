
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        fbid:'10158790617955387',
      },{
        fbid:'10210041946139899',
      },{
        fbid:'10105134444893173',
      },{
        fbid:'10207858351131656',
      },{
        fbid:'10102284615688885',
      },{
        fbid:'10213125261349823',
      },{
        fbid:'1339506802833064',
      },{
        fbid:'10200784227387716',
      }]);
    });
};
