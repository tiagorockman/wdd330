/*determine universities that was not founded and update data*/

/*SELECT  *
FROM colleges
WHERE EXISTS (
				SELECT CASE WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) LIKE '%of%'
									THEN SUBSTRING_INDEX(name, '--', 1)
									ELSE SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) END AS namefinal,
								SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) AS Short_Name, 
                                SUBSTRING_INDEX(name, ' ', 2) As middle,
								SUBSTRING_INDEX(name, '--', 1) AS cleaned_name,
								CONCAT(f.name, '%') 
				FROM (
				WITH expected (name) AS (
									SELECT  'Princeton University'
									UNION ALL SELECT'Harvard University'
									UNION ALL SELECT'University of Chicago'
									UNION ALL SELECT'Yale University'
									UNION ALL SELECT'Columbia University'
									UNION ALL SELECT'Stanford University'
									UNION ALL SELECT'Massachusetts Institute of Technology'
									UNION ALL SELECT'Duke University'
									UNION ALL SELECT'University of Pennsylvania'
									UNION ALL SELECT'Johns Hopkins University'
									UNION ALL SELECT'Dartmouth College'
									UNION ALL SELECT'California Institute of Technology'
									UNION ALL SELECT'Northwestern University'
									UNION ALL SELECT'Brown University'
									UNION ALL SELECT'Cornell University'
									UNION ALL SELECT'Rice University'
									UNION ALL SELECT'University of Notre Dame'
									UNION ALL SELECT'Vanderbilt University'
									UNION ALL SELECT'Washington University in St. Louis'
									UNION ALL SELECT'Emory University'
									UNION ALL SELECT'Georgetown University'
									UNION ALL SELECT'University of California--Berkeley'
									UNION ALL SELECT'University of Southern California'
									UNION ALL SELECT'Carnegie Mellon University'
									UNION ALL SELECT'University of California--Los Angeles'
									UNION ALL SELECT'University of Virginia'
									UNION ALL SELECT'Tufts University'
									UNION ALL SELECT'University of Michigan--Ann Arbor'
									UNION ALL SELECT'Wake Forest University'
									UNION ALL SELECT'University of North Carolina--Chapel Hill'
									UNION ALL SELECT'Boston College'
									UNION ALL SELECT'College of William & Mary'
									UNION ALL SELECT'University of Rochester'
									UNION ALL SELECT'Brandeis University'
									UNION ALL SELECT'Georgia Institute of Technology'
									UNION ALL SELECT'New York University'
									UNION ALL SELECT'Case Western Reserve University'
									UNION ALL SELECT'University of California--Santa Barbara'
									UNION ALL SELECT'Boston University'
									UNION ALL SELECT'Northeastern University'
									UNION ALL SELECT'Rensselaer Polytechnic Institute'
									UNION ALL SELECT'Tulane University'
									UNION ALL SELECT'University of California--Irvine'
									UNION ALL SELECT'Lehigh University'
									UNION ALL SELECT'University of California--Davis'
									UNION ALL SELECT'University of California--San Diego'
									UNION ALL SELECT'University of Illinois--Urbana-Champaign'
									UNION ALL SELECT'University of Miami'
									UNION ALL SELECT'University of Wisconsin--Madison'
									UNION ALL SELECT'Pepperdine University'
									UNION ALL SELECT'University of Florida'
									UNION ALL SELECT'Villanova University'
									UNION ALL SELECT'Pennsylvania State University--University Park'
									UNION ALL SELECT'Ohio State University--Columbus'
									UNION ALL SELECT'University of Washington'
									UNION ALL SELECT'George Washington University'
									UNION ALL SELECT'Southern Methodist University'
									UNION ALL SELECT'University of Georgia'
									UNION ALL SELECT'University of Texas--Austin'
									UNION ALL SELECT'Fordham University'
									UNION ALL SELECT'Purdue University--West Lafayette'
									UNION ALL SELECT'Syracuse University'
									UNION ALL SELECT'University of Connecticut'
									UNION ALL SELECT'University of Maryland--College Park'
									UNION ALL SELECT'Worcester Polytechnic Institute'
									UNION ALL SELECT'Clemson University'
									UNION ALL SELECT'Yeshiva University'
									UNION ALL SELECT'Brigham Young University--Provo'
									UNION ALL SELECT'University of Pittsburgh'
									UNION ALL SELECT'Rutgers University--New Brunswick'
									UNION ALL SELECT'Baylor University'
									UNION ALL SELECT'Stevens Institute of Technology'
									UNION ALL SELECT'University of Minnesota--Twin Cities'
									UNION ALL SELECT'American University'
									UNION ALL SELECT'Clark University'
									UNION ALL SELECT'Texas A&M University--College Station'
									UNION ALL SELECT'University of Massachusetts--Amherst'
									UNION ALL SELECT'Virginia Tech'
									UNION ALL SELECT'Miami University--Oxford'
									UNION ALL SELECT'University of California--Santa Cruz'
									UNION ALL SELECT'University of Delaware'
									UNION ALL SELECT'Colorado School of Mines'
									UNION ALL SELECT'Michigan State University'
									UNION ALL SELECT'Texas Christian University'
									UNION ALL SELECT'University of Iowa'
									UNION ALL SELECT'Binghamton University--SUNY'
									UNION ALL SELECT'Indiana University--Bloomington'
									UNION ALL SELECT'Marquette University'
									UNION ALL SELECT'University of Denver'
									UNION ALL SELECT'University of San Diego'
									UNION ALL SELECT'University of Tulsa'
									UNION ALL SELECT'Florida State University'
									UNION ALL SELECT'North Carolina State University--Raleigh'
									UNION ALL SELECT'University of Colorado--Boulder'
									UNION ALL SELECT'University of Vermont'
									UNION ALL SELECT'Drexel University'
									UNION ALL SELECT'Saint Louis University'
									UNION ALL SELECT'Stony Brook University--SUNY'
									UNION ALL SELECT'Auburn University'
									UNION ALL SELECT'Loyola University Chicago'
									UNION ALL SELECT'SUNY College of Environmental Science and Forestry'
									UNION ALL SELECT'University at Buffalo--SUNY'
									UNION ALL SELECT'Illinois Institute of Technology'
									UNION ALL SELECT'University of Alabama'
									UNION ALL SELECT'University of Oregon'
									UNION ALL SELECT'University of Tennessee'
									UNION ALL SELECT'Rochester Institute of Technology'
									UNION ALL SELECT'University of New Hampshire'
									UNION ALL SELECT'University of San Francisco'
									UNION ALL SELECT'University of South Carolina'
									UNION ALL SELECT'Iowa State University'
									UNION ALL SELECT'University of Dayton'
									UNION ALL SELECT'University of Missouri'
									UNION ALL SELECT'University of Nebraska--Lincoln'
									UNION ALL SELECT'University of Oklahoma'
									UNION ALL SELECT'University of the Pacific'
									UNION ALL SELECT'University of Utah'
									UNION ALL SELECT'Michigan Technological University'
									UNION ALL SELECT'Seton Hall University'
									UNION ALL SELECT'Temple University'
									UNION ALL SELECT'University of California--Riverside'
									UNION ALL SELECT'University of Kansas'
									UNION ALL SELECT'University of St. Thomas'
									UNION ALL SELECT'The Catholic University of America'
									UNION ALL SELECT'DePaul University'
									UNION ALL SELECT'Duquesne University'
									UNION ALL SELECT'Howard University'
									UNION ALL SELECT'University of Arizona'
									UNION ALL SELECT'Arizona State University--Tempe'
									UNION ALL SELECT'Clarkson University'
									UNION ALL SELECT'Colorado State University'
									UNION ALL SELECT'New School'
									UNION ALL SELECT'Hofstra University'
									UNION ALL SELECT'University of Kentucky'
									UNION ALL SELECT'Kansas State University'
									UNION ALL SELECT'Louisiana State University--Baton Rouge'
									UNION ALL SELECT'Mercer University'
									UNION ALL SELECT'New Jersey Institute of Technology'
									UNION ALL SELECT'Rutgers University--Newark'
									UNION ALL SELECT'University of Arkansas'
									UNION ALL SELECT'University of Cincinnati'
									UNION ALL SELECT'University of Mississippi'
									UNION ALL SELECT'George Mason University'
									UNION ALL SELECT'Oregon State University'
									UNION ALL SELECT'Washington State University'
									UNION ALL SELECT'Adelphi University'
									UNION ALL SELECT'Ohio University'
									UNION ALL SELECT'San Diego State University'
									UNION ALL SELECT'St. John Fisher College'
									UNION ALL SELECT'University at Albany--SUNY'
									UNION ALL SELECT'University of Texas--Dallas'
									UNION ALL SELECT'Illinois State University'
									UNION ALL SELECT'Immaculata University'
									UNION ALL SELECT'Oklahoma State University'
									UNION ALL SELECT'University of California--Merced'
									UNION ALL SELECT'University of Illinois--Chicago'
									UNION ALL SELECT'University of La Verne'
									UNION ALL SELECT'University of Massachusetts--Lowell'
									UNION ALL SELECT'Seattle Pacific University'
									UNION ALL SELECT'University of Alabama--Birmingham'
									UNION ALL SELECT'University of Maryland--Baltimore County'
									UNION ALL SELECT'University of Rhode Island'
									UNION ALL SELECT'University of South Florida'
									UNION ALL SELECT'Biola University'
									UNION ALL SELECT'Maryville University of St. Louis'
									UNION ALL SELECT'Missouri University of Science & Technology'
									UNION ALL SELECT'St. John''s University'
									UNION ALL SELECT'Virginia Commonwealth University'
									UNION ALL SELECT'Union University'
									UNION ALL SELECT'University of Hawaii--Manoa'
									UNION ALL SELECT'Edgewood College'
									UNION ALL SELECT'Florida Institute of Technology'
									UNION ALL SELECT'University of Idaho'
									UNION ALL SELECT'University of Louisville'
									UNION ALL SELECT'University of Wyoming'
									UNION ALL SELECT'Ball State University'
									UNION ALL SELECT'Lipscomb University'
									UNION ALL SELECT'Mississippi State University'
									UNION ALL SELECT'Montclair State University'
									UNION ALL SELECT'Texas Tech University'
									UNION ALL SELECT'University of Central Florida'
									UNION ALL SELECT'University of New Mexico'
									UNION ALL SELECT'Andrews University'
									UNION ALL SELECT'Azusa Pacific University'
									UNION ALL SELECT'University of Maine'
									UNION ALL SELECT'West Virginia University'
									UNION ALL SELECT'Widener University'
									UNION ALL SELECT'Kent State University'
									UNION ALL SELECT'North Dakota State University'
									UNION ALL SELECT'Pace University'
									UNION ALL SELECT'Robert Morris University'
									UNION ALL SELECT'Suffolk University'
									UNION ALL SELECT'University of Hartford'
									UNION ALL SELECT'Bowling Green State University'
									UNION ALL SELECT'University of Houston'
									UNION ALL SELECT'Western Michigan University'
									UNION ALL SELECT'Indiana University-Purdue University--Indianapolis'
									UNION ALL SELECT'Lesley University'
									UNION ALL SELECT'University of Alabama--Huntsville'
									UNION ALL SELECT'University of Colorado--Denver'
									UNION ALL SELECT'University of Nevada--Reno'
									UNION ALL SELECT'California State University--Fullerton'
									UNION ALL SELECT'Central Michigan University'
									UNION ALL SELECT'Louisiana Tech University'
									UNION ALL SELECT'South Dakota State University'
									UNION ALL SELECT'University of Alaska--Fairbanks'
									UNION ALL SELECT'University of North Carolina--Charlotte'
									UNION ALL SELECT'University of North Dakota'
									UNION ALL SELECT'University of South Dakota'
									UNION ALL SELECT'East Carolina University'
									UNION ALL SELECT'Montana State University'
									UNION ALL SELECT'Old Dominion University'
									UNION ALL SELECT'University of Missouri--Kansas City'
									UNION ALL SELECT'Ashland University'
									UNION ALL SELECT'Dallas Baptist University'
									UNION ALL SELECT'Northern Illinois University'
									UNION ALL SELECT'Nova Southeastern University'
									UNION ALL SELECT'Southern Illinois University--Carbondale'
									UNION ALL SELECT'University of Montana'
									UNION ALL SELECT'Benedictine University'
									UNION ALL SELECT'California State University--Fresno'
									UNION ALL SELECT'Gardner-Webb University'
									UNION ALL SELECT'New Mexico State University'
									UNION ALL SELECT'Shenandoah University'
									UNION ALL SELECT'Tennessee Technological University'
									UNION ALL SELECT'University of Massachusetts--Boston'
									UNION ALL SELECT'University of Massachusetts--Dartmouth'
									UNION ALL SELECT'University of Missouri--St. Louis'
									UNION ALL SELECT'University of North Carolina--Greensboro'
									UNION ALL SELECT'University of Southern Mississippi'
									UNION ALL SELECT'Utah State University'
								)
					SELECT e.name
					FROM expected e
					LEFT JOIN colleges c ON c.name = e.name
					WHERE c.objectid IS NULL
				)f
    WHERE colleges.name LIKE CONCAT(CASE WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(f.name, '--', 1), ' ', 2) LIKE '%of%'
									THEN SUBSTRING_INDEX(f.name, '--', 1)
									ELSE SUBSTRING_INDEX(SUBSTRING_INDEX(f.name, '--', 1), ' ', 2) END, '%')
);
*/
-- Create temporary table
CREATE TEMPORARY TABLE temp_universities (
    Name VARCHAR(255),
    URank INT,
    Tuition_and_fees VARCHAR(20)
);

-- Insert data
INSERT INTO temp_universities (Name, URank, Tuition_and_fees) VALUES
('Princeton University', 1, '$45,320'),
('Harvard University', 2, '$47,074'),
('University of Chicago', 3, '$52,491'),
('Yale University', 3, '$49,480'),
('Columbia University', 5, '$55,056'),
('Stanford University', 5, '$47,940'),
('Massachusetts Institute of Technology', 7, '$48,452'),
('Duke University', 8, '$51,265'),
('University of Pennsylvania', 8, '$51,464'),
('Johns Hopkins University', 10, '$50,410'),
('Dartmouth College', 11, '$51,438'),
('California Institute of Technology', 12, '$47,577'),
('Northwestern University', 12, '$50,855'),
('Brown University', 14, '$51,367'),
('Cornell University', 15, '$50,953'),
('Rice University', 15, '$43,918'),
('University of Notre Dame', 15, '$49,685'),
('Vanderbilt University', 15, '$45,610'),
('Washington University in St. Louis', 19, '$49,770'),
('Emory University', 20, '$47,954'),
('Georgetown University', 20, '$50,547'),
('University of California--Berkeley', 20, '$40,191'),
('University of Southern California', 23, '$52,217'),
('Carnegie Mellon University', 24, '$52,040'),
('University of California--Los Angeles', 24, '$39,518'),
('University of Virginia', 24, '$45,066'),
('Tufts University', 27, '$52,430'),
('University of Michigan--Ann Arbor', 27, '$43,476'),
('Wake Forest University', 27, '$49,308'),
('University of North Carolina--Chapel Hill', 30, '$33,916'),
('Boston College', 31, '$51,296'),
('College of William & Mary', 32, '$41,718'),
('University of Rochester', 32, '$50,142'),
('Brandeis University', 34, '$51,570'),
('Georgia Institute of Technology', 34, '$32,404'),
('New York University', 36, '$49,062'),
('Case Western Reserve University', 37, '$46,006'),
('University of California--Santa Barbara', 37, '$40,704'),
('Boston University', 39, '$50,240'),
('Northeastern University', 39, '$47,655'),
('Rensselaer Polytechnic Institute', 39, '$50,797'),
('Tulane University', 39, '$51,010'),
('University of California--Irvine', 39, '$39,458'),
('Lehigh University', 44, '$48,320'),
('University of California--Davis', 44, '$40,728'),
('University of California--San Diego', 44, '$41,387'),
('University of Illinois--Urbana-Champaign', 44, '$31,320'),
('University of Miami', 44, '$47,004'),
('University of Wisconsin--Madison', 44, '$32,738'),
('Pepperdine University', 50, '$50,022'),
('University of Florida', 50, '$28,666'),
('Villanova University', 50, '$49,280'),
('Pennsylvania State University--University Park', 50, '$32,382'),
('Ohio State University--Columbus', 54, '$29,229'),
('University of Washington', 54, '$34,791'),
('George Washington University', 56, '$51,950'),
('Southern Methodist University', 56, '$50,358'),
('University of Georgia', 56, '$29,844'),
('University of Texas--Austin', 56, '$34,676'),
('Fordham University', 60, '$47,317'),
('Purdue University--West Lafayette', 60, '$28,804'),
('Syracuse University', 60, '$45,022'),
('University of Connecticut', 60, '$35,858'),
('University of Maryland--College Park', 60, '$32,045'),
('Worcester Polytechnic Institute', 60, '$46,994'),
('Clemson University', 66, '$32,796'),
('Yeshiva University', 66, '$40,670'),
('Brigham Young University--Provo', 68, '$5,300'),
('University of Pittsburgh', 68, '$29,758'),
('Rutgers University--New Brunswick', 70, '$30,023'),
('Baylor University', 71, '$42,006'),
('Stevens Institute of Technology', 71, '$48,838'),
('University of Minnesota--Twin Cities', 71, '$22,210'),
('American University', 74, '$44,853'),
('Clark University', 74, '$43,150'),
('Texas A&M University--College Station', 74, '$28,768'),
('University of Massachusetts--Amherst', 74, '$30,123'),
('Virginia Tech', 74, '$29,371'),
('Miami University--Oxford', 79, '$31,592'),
('University of California--Santa Cruz', 79, '$40,241'),
('University of Delaware', 79, '$31,420'),
('Colorado School of Mines', 82, '$34,828'),
('Michigan State University', 82, '$39,090'),
('Texas Christian University', 82, '$42,670'),
('University of Iowa', 82, '$28,413'),
('Binghamton University--SUNY', 86, '$22,164'),
('Indiana University--Bloomington', 86, '$34,246'),
('Marquette University', 86, '$38,470'),
('University of Denver', 86, '$46,362'),
('University of San Diego', 86, '$46,140'),
('University of Tulsa', 86, '$38,796'),
('Florida State University', 92, '$24,673'),
('North Carolina State University--Raleigh', 92, '$26,399'),
('University of Colorado--Boulder', 92, '$35,079'),
('University of Vermont', 92, '$40,364'),
('Drexel University', 96, '$51,030'),
('Saint Louis University', 96, '$40,726'),
('Stony Brook University--SUNY', 96, '$26,266'),
('Auburn University', 99, '$28,840'),
('Loyola University Chicago', 99, '$41,384'),
('SUNY College of Environmental Science and Forestry', 99, '$17,620'),
('University at Buffalo--SUNY', 99, '$26,270'),
('Illinois Institute of Technology', 103, '$45,214'),
('University of Alabama', 103, '$26,950'),
('University of Oregon', 103, '$33,442'),
('University of Tennessee', 103, '$30,858'),
('Rochester Institute of Technology', 107, '$38,568'),
('University of New Hampshire', 107, '$31,424'),
('University of San Francisco', 107, '$44,494'),
('University of South Carolina', 107, '$31,282'),
('Iowa State University', 111, '$21,483'),
('University of Dayton', 111, '$40,940'),
('University of Missouri', 111, '$25,892'),
('University of Nebraska--Lincoln', 111, '$23,148'),
('University of Oklahoma', 111, '$21,451'),
('University of the Pacific', 111, '$44,588'),
('University of Utah', 111, '$27,039'),
('Michigan Technological University', 118, '$30,968'),
('Seton Hall University', 118, '$39,258'),
('Temple University', 118, '$25,994'),
('University of California--Riverside', 118, '$40,263'),
('University of Kansas', 118, '$25,932'),
('University of St. Thomas', 118, '$39,594'),
('The Catholic University of America', 124, '$42,536'),
('DePaul University', 124, '$37,626'),
('Duquesne University', 124, '$35,062'),
('Howard University', 124, '$24,908'),
('University of Arizona', 124, '$30,025'),
('Arizona State University--Tempe', 129, '$25,458'),
('Clarkson University', 129, '$46,132'),
('Colorado State University', 129, '$28,374'),
('New School', 129, '$45,535'),
('Hofstra University', 133, '$42,160'),
('University of Kentucky', 133, '$26,334'),
('Kansas State University', 135, '$23,429'),
('Louisiana State University--Baton Rouge', 135, '$27,005'),
('Mercer University', 135, '$35,130'),
('New Jersey Institute of Technology', 135, '$30,326'),
('Rutgers University--Newark', 135, '$29,480'),
('University of Arkansas', 135, '$23,168'),
('University of Cincinnati', 135, '$26,334'),
('University of Mississippi', 135, '$22,012'),
('George Mason University', 143, '$32,582'),
('Oregon State University', 143, '$28,846'),
('Washington State University', 143, '$25,673'),
('Adelphi University', 146, '$34,034'),
('Ohio University', 146, '$21,208'),
('San Diego State University', 146, '$18,244'),
('St. John Fisher College', 146, '$31,880'),
('University at Albany--SUNY', 146, '$22,244'),
('University of Texas--Dallas', 146, '$33,654'),
('Illinois State University', 152, '$20,886'),
('Immaculata University', 152, '$35,210'),
('Oklahoma State University', 152, '$20,978'),
('University of California--Merced', 152, '$39,944'),
('University of Illinois--Chicago', 152, '$26,526'),
('University of La Verne', 152, '$39,900'),
('University of Massachusetts--Lowell', 152, '$29,125'),
('Seattle Pacific University', 159, '$38,940'),
('University of Alabama--Birmingham', 159, '$17,654'),
('University of Maryland--Baltimore County', 159, '$24,492'),
('University of Rhode Island', 159, '$28,852'),
('University of South Florida', 159, '$17,325'),
('Biola University', 164, '$36,696'),
('Maryville University of St. Louis', 164, '$27,958'),
('Missouri University of Science & Technology', 164, '$26,152'),
('St. John''s University', 164, '$39,460'),
('Virginia Commonwealth University', 164, '$31,608'),
('Union University', 169, '$30,420'),
('University of Hawaii--Manoa', 169, '$33,764'),
('Edgewood College', 171, '$27,530'),
('Florida Institute of Technology', 171, '$40,446'),
('University of Idaho', 171, '$22,040'),
('University of Louisville', 171, '$24,626'),
('University of Wyoming', 171, '$16,215'),
('Ball State University', 176, '$25,428'),
('Lipscomb University', 176, '$29,756'),
('Mississippi State University', 176, '$20,142'),
('Montclair State University', 176, '$20,318'),
('Texas Tech University', 176, '$22,861'),
('University of Central Florida', 176, '$22,467'),
('University of New Mexico', 176, '$21,302'),
('Andrews University', 183, '$27,684'),
('Azusa Pacific University', 183, '$36,120'),
('University of Maine', 183, '$29,498'),
('West Virginia University', 183, '$21,432'),
('Widener University', 183, '$42,870'),
('Kent State University', 188, '$18,376'),
('North Dakota State University', 188, '$19,790'),
('Pace University', 188, '$42,772'),
('Robert Morris University', 188, '$28,250'),
('Suffolk University', 188, '$35,578'),
('University of Hartford', 188, '$37,790'),
('Bowling Green State University', 194, '$18,332'),
('University of Houston', 194, '$25,410'),
('Western Michigan University', 194, '$25,713'),
('Indiana University-Purdue University--Indianapolis', 197, '$29,791'),
('Lesley University', 197, '$25,750'),
('University of Alabama--Huntsville', 197, '$20,622'),
('University of Colorado--Denver', 197, '$29,334'),
('University of Nevada--Reno', 197, '$21,052'),
('California State University--Fullerton', 202, '$17,596'),
('Central Michigan University', 202, '$23,670'),
('Louisiana Tech University', 202, '$25,851'),
('South Dakota State University', 202, '$11,403'),
('University of Alaska--Fairbanks', 202, '$22,469'),
('University of North Carolina--Charlotte', 202, '$20,193'),
('University of North Dakota', 202, '$18,899'),
('University of South Dakota', 202, '$11,688'),
('East Carolina University', 210, '$22,904'),
('Montana State University', 210, '$23,042'),
('Old Dominion University', 210, '$27,028'),
('University of Missouri--Kansas City', 210, '$22,714'),
('Ashland University', 214, '$20,392'),
('Dallas Baptist University', 214, '$26,180'),
('Northern Illinois University', 214, '$23,799'),
('Nova Southeastern University', 214, '$27,660'),
('Southern Illinois University--Carbondale', 214, '$27,130'),
('University of Montana', 214, '$24,562'),
('Benedictine University', 220, '$32,170'),
('California State University--Fresno', 220, '$17,209'),
('Gardner-Webb University', 220, '$29,850'),
('New Mexico State University', 220, '$21,234'),
('Shenandoah University', 220, '$31,322'),
('Tennessee Technological University', 220, '$24,800'),
('University of Massachusetts--Boston', 220, '$32,023'),
('University of Massachusetts--Dartmouth', 220, '$19,270'),
('University of Missouri--St. Louis', 220, '$26,277'),
('University of North Carolina--Greensboro', 220, '$21,595'),
('University of Southern Mississippi', 220, '$16,094'),
('Utah State University', 220, '$19,772');


ALTER TABLE college_domains ADD URank INT,
    ADD Tuition_and_fees VARCHAR(20);

/*UPDATE INFO from ids that already exist*/
UPDATE college_domains d
INNER JOIN colleges c
ON d.objectid = c.objectid
JOIN (
    SELECT 
        SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) AS Short_Name,
        f.URank,
        f.Tuition_and_fees
    FROM temp_universities f
) f ON c.name LIKE CONCAT(f.Short_Name, '%') 
   AND f.Short_Name <> 'University of'
SET d.URank = f.URank,
    d.Tuition_and_fees = f.Tuition_and_fees;

/*select * from college_domains where objectid = '1029'*/

/*INSERT INFORMATION that is new*/
INSERT INTO college_domains (objectid, URank, Tuition_and_fees)
SELECT  c.objectid, f.Urank, f.Tuition_and_fees
FROM colleges c
inner join (SELECT distinct /*CASE WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) LIKE '%of%'
									THEN SUBSTRING_INDEX(name, '--', 1)
									ELSE SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) END AS namefinal,*/
								SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) AS Short_Name, 
                                /*SUBSTRING_INDEX(name, ' ', 2) As middle,
								SUBSTRING_INDEX(name, '--', 1) AS cleaned_name,
								CONCAT(f.name, '%'),*/
                                f.URank, f.Tuition_and_fees
				FROM temp_universities f
                ) f
ON c.name LIKE CONCAT(f.Short_Name, '%') AND f.Short_Name <> "University of"	
LEFT JOIN college_domains d ON c.objectid = d.objectid
WHERE d.objectid is null;

/*Update University Of*/
/*Determine
SELECT  c.objectid, f.Urank, f.Tuition_and_fees, CONCAT(f.cleaned_name, '%'), c.name, f.completename, d.Tuition_and_fees, d.Urank
FROM colleges c
INNER JOIN (
SELECT distinct /*CASE WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) LIKE '%of%' AND f.name NOT LIKE '%-%'
									THEN SUBSTRING_INDEX(name, '--', 1)
									ELSE SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) END AS namefinal,
								SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) AS Short_Name, 
                                SUBSTRING_INDEX(name, ' ', 2) As middle,
								SUBSTRING_INDEX(name, '--', 1) AS cleaned_name,
                                /*SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', -1), ' ', 1) AS name_with_line,
								CONCAT(f.name, '%') as completename,
                                f.URank, f.Tuition_and_fees
				FROM temp_universities f
                WHERE SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) LIKE '%of%' AND f.name NOT LIKE '%-%'
                ) f
ON c.name LIKE CONCAT(f.cleaned_name, '%') 
inner JOIN college_domains d ON c.objectid = d.objectid
WHERE (d.Tuition_and_fees is null or d.Urank is null);
*/

/*Update*/
UPDATE college_domains d
INNER JOIN colleges c
ON d.objectid = c.objectid
JOIN (
    SELECT 
       	SUBSTRING_INDEX(name, '--', 1) AS cleaned_name,
        f.URank,
        f.Tuition_and_fees
    FROM temp_universities f
     WHERE SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) LIKE '%of%' AND f.name NOT LIKE '%-%'
) f ON c.name LIKE CONCAT(f.cleaned_name, '%') 
SET d.URank = f.URank,
    d.Tuition_and_fees = f.Tuition_and_fees
WHERE (d.Tuition_and_fees is null or d.Urank is null);

/*insert*/
INSERT INTO college_domains (objectid, URank, Tuition_and_fees)
SELECT  c.objectid, f.Urank, f.Tuition_and_fees
FROM colleges c
inner join (SELECT distinct   	SUBSTRING_INDEX(name, '--', 1) AS cleaned_name,
                                f.URank, f.Tuition_and_fees
				FROM temp_universities f
                  WHERE SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) LIKE '%of%' AND f.name NOT LIKE '%-%'
                ) f
ON c.name LIKE CONCAT(f.cleaned_name, '%')
LEFT JOIN college_domains d ON c.objectid = d.objectid
WHERE d.objectid is null;

/*Name With --*/
/*Determine*/
SELECT  c.objectid, f.Urank, f.Tuition_and_fees, CONCAT(f.name_with_line_final, '%'), c.name, f.completename, d.Tuition_and_fees, d.Urank
FROM colleges c
INNER JOIN (
SELECT distinct CASE WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) LIKE '%of%' AND f.name NOT LIKE '%-%'
									THEN SUBSTRING_INDEX(name, '--', 1)
									ELSE SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) END AS namefinal,
								SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', 1), ' ', 2) AS Short_Name, 
                                SUBSTRING_INDEX(name, ' ', 2) As middle,
								SUBSTRING_INDEX(name, '--', 1) AS cleaned_name,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', -1), ' ', 1) AS name_with_line,
                                CONCAT(concat(SUBSTRING_INDEX(name, '--', 1), '%'), SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', -1), ' ', 1)) AS name_with_line_final,
								CONCAT(f.name, '%') as completename,
                                f.URank, f.Tuition_and_fees
				FROM temp_universities f
                WHERE f.name LIKE '%--%'
                ) f
ON c.name LIKE CONCAT(f.name_with_line_final, '%') 
inner JOIN college_domains d ON c.objectid = d.objectid
WHERE (d.Tuition_and_fees is null or d.Urank is null);

/*Update*/
UPDATE college_domains d
INNER JOIN colleges c
ON d.objectid = c.objectid
JOIN (
    SELECT 
          CONCAT(concat(SUBSTRING_INDEX(name, '--', 1), '%'), SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', -1), ' ', 1)) AS name_with_line_final,
        f.URank,
        f.Tuition_and_fees
    FROM temp_universities f
     WHERE f.name LIKE '%--%'
) f ON c.name LIKE CONCAT(f.name_with_line_final, '%') 
SET d.URank = f.URank,
    d.Tuition_and_fees = f.Tuition_and_fees
WHERE (d.Tuition_and_fees is null or d.Urank is null);

/*insert*/
INSERT INTO college_domains (objectid, URank, Tuition_and_fees)
SELECT  c.objectid, f.Urank, f.Tuition_and_fees
FROM colleges c
inner join (SELECT distinct   	 CONCAT(concat(SUBSTRING_INDEX(name, '--', 1), '%'), SUBSTRING_INDEX(SUBSTRING_INDEX(name, '--', -1), ' ', 1)) AS name_with_line_final,
                                f.URank, f.Tuition_and_fees
				FROM temp_universities f
                  WHERE  f.name LIKE '%--%'
                ) f
ON c.name LIKE CONCAT(f.name_with_line_final, '%')
LEFT JOIN college_domains d ON c.objectid = d.objectid
WHERE d.objectid is null;
