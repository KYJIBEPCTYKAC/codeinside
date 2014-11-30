select r.goodsid, g.name, (r.ordered_day-r.cons_day) ordered, (r.buy_total- r.cons_total) in_store from 
(select ord.goodsid, ord.ordered_day, coalesce(rcv.cons_day,0) cons_day, coalesce(buy_total,0) buy_total, coalesce(cons_total,0) cons_total from (
select m.goodsid, sum(m.amount) ordered_day from rest.mat m
	inner join rest.doc d on d.id=m.doc
	inner join rest.user u on u.id=d.contr_from and u.type=0 --повар
	inner join rest.user u2 on u2.id=d.contr_to and u2.type=2 --кладовщик
group by m.goodsid) ord
left join (
	select m.goodsid, sum(amount) cons_day from rest.mat m
	inner join rest.doc d on d.id=m.doc
	inner join rest.user u on u.id=d.contr_from and u.type=2 --кладовщик
	inner join rest.user u2 on u2.id=d.contr_to and u2.type=0 --повар
	group by m.goodsid
	) rcv on rcv.goodsid=ord.goodsid
left join  (
select m.goodsid, sum(m.amount) buy_total from rest.mat m
	inner join rest.doc d on d.id=m.doc
	inner join rest.user u on u.id=d.contr_from and u.type=1 --снабженец
	inner join rest.user u2 on u2.id=d.contr_to and u2.type=2 --кладовщик
group by m.goodsid) buy on buy.goodsid=ord.goodsid
left join (
	select m.goodsid, sum(amount) cons_total from rest.mat m
	inner join rest.doc d on d.id=m.doc
	inner join rest.user u on u.id=d.contr_from and u.type=2 --кладовщик
	inner join rest.user u2 on u2.id=d.contr_to and u2.type=0 --повар
	group by m.goodsid
	) consum on consum.goodsid=ord.goodsid
) r
inner join rest.goods g on g.id=r.goodsid
--10
