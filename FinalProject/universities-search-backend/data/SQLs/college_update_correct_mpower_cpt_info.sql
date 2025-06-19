SELECT COUNT(*) FROM COLLEGES WHERE mpwpowerFinance = 1;

select objectid, ipedsid, source from colleges where ipedsid is null;

select * from college_domains where mpowerfinance <> 0;

select * from colleges where  name = "MARYLAND INSTITUTE COLLEGE OF ART";

SELECT c.*,d.mpowerfinance, d.CPT FROM colleges c LEFT JOIN college_domains d ON c.objectid = d.objectid
where  name = "MARYLAND INSTITUTE COLLEGE OF ART";

select objectid, name from colleges;

CREATE TABLE `college_domains` (
  `objectid` varchar(255) DEFAULT NULL,
  `mpowerfinance` tinyint DEFAULT '0',
  `CPT` tinyint DEFAULT '0',
  `URank` int DEFAULT NULL,
  `Tuition_and_fees` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SELECT c.*,d.mpowerfinance, d.CPT, d.URank, d.Tuition_and_fees, CONVERT(d.Tuition_and_fees, UNSIGNED) 
FROM colleges c 
LEFT JOIN college_domains d ON c.objectid = d.objectid 
WHERE CONVERT(d.Tuition_and_fees, UNSIGNED) >= 30000 
AND CONVERT(d.Tuition_and_fees, UNSIGNED) <= 50000 
ORDER BY c.name ASC 
LIMIT 10;

select objectid, name, state from colleges 

 SELECT * from colleges where objectid in(487649, 105);
 select * from college_domains where objectid in( '487649' );
 select * from colleges where name like '%fran%';

 
   /*UPDATES*/
   
 update colleges set ipedsid = 115773 where objectid = 4283;
 update college_domains set objectid = 4283,  Urank = '85', Tuition_and_fees = '$21,000' where objectid = 115773;
 delete from colleges where objectid = 115773;
 
 update college_domains set objectid = 5991, URank = '126', Tuition_and_fees = '$11,310 '   where objectid = 130989;
  delete from colleges where objectid = 130989;
  
  update college_domains set objectid = 239, Urank =  '11',Tuition_and_fees =  '$32,284'  where objectid = 151801;
  insert into college_domains select '6491' as objectid, mpowerfinance, CPT, '11' URank, '$8,982' Tuition_and_fees from college_domains where objectid = 239;
  insert into college_domains select '701' as objectid, mpowerfinance, CPT, '11' URank, '$32,284' Tuition_and_fees from college_domains where objectid = 239;
  delete from colleges where objectid = 151801;
  
	update college_domains set objectid = 1045, Urank =  '51' ,Tuition_and_fees =  '$15,284'  where objectid = 155627;
	update college_domains set objectid = 1368, Urank =  '51' ,Tuition_and_fees =  '$15,284'  where objectid = 155636;
	insert into college_domains select '2919' as objectid, mpowerfinance, CPT, '51' URank, '$15,284' Tuition_and_fees from college_domains where objectid = 1368;
	insert into college_domains select '3082' as objectid, mpowerfinance, CPT, '51' URank, '$15,284' Tuition_and_fees from college_domains where objectid = 1368;
	insert into college_domains select '4242' as objectid, mpowerfinance, CPT, '51' URank, '$15,284' Tuition_and_fees from college_domains where objectid = 1368;
	insert into college_domains select '6133' as objectid, mpowerfinance, CPT, '51' URank, '$15,284' Tuition_and_fees from college_domains where objectid = 1368;
	delete from colleges where objectid = '155627';
	delete from colleges where objectid = '155636';
  
   update college_domains set objectid = 4560, Urank = '51', Tuition_and_fees = '$28,000' where objectid = 186432;
   delete from colleges where objectid = 186432;
   
    update college_domains set objectid = 1652, Tuition_and_fees = '$21,450' where objectid = 195173;
   delete from colleges where objectid = 195173;
   
	update college_domains set objectid = 2053, Urank = '51', Tuition_and_fees = '$12,000' where objectid = 384412;
    insert into college_domains select '3568' as objectid, mpowerfinance, CPT, '51' URank, '$12,000' Tuition_and_fees from college_domains where objectid = 2053;
    insert into college_domains select '5643' as objectid, mpowerfinance, CPT, '51' URank, '$12,000' Tuition_and_fees from college_domains where objectid = 2053;
   delete from colleges where objectid = 384412;
   
   update college_domains set Tuition_and_fees = '$21,000' where objectid = 441371;
	update college_domains set Tuition_and_fees = '$14,256' where objectid = 483780;
    
     update college_domains set objectid = 105, Tuition_and_fees = '$13,518' where objectid = 487649;
 delete from colleges where objectid = 487649;
    
   
  
  
  
  