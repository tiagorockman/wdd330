/*Verificar quais não tem para insesrir)

SELECT * FROM COLLEGES WHERE NAME LIKE '%TEXAS TECH%';
SELECT university_name
FROM (
    SELECT 'Westcliff University' AS university_name UNION ALL
    SELECT 'Sofia University' UNION ALL
    SELECT 'California Institute of Advanced Management (CIAM)' UNION ALL
    SELECT 'Humphreys University' UNION ALL
    SELECT 'Monroe College' UNION ALL
    SELECT 'New England College' UNION ALL
    SELECT 'Harrisburg University of Science and Technology' UNION ALL
    SELECT 'Goldey‑Beacom College' UNION ALL
    SELECT 'McDaniel College' UNION ALL
    SELECT 'National Louis University' UNION ALL
    SELECT 'Texas Wesleyan University' UNION ALL
    SELECT 'Indiana Wesleyan University' UNION ALL
    SELECT 'Ottawa University' UNION ALL
    SELECT 'North Carolina Wesleyan College' UNION ALL
    SELECT 'Tennessee Wesleyan University' UNION ALL
    SELECT 'Saint Peter’s University' UNION ALL
    SELECT 'Dallas Baptist University' UNION ALL
    SELECT 'University of the Cumberlands' UNION ALL
    SELECT 'Trine University' UNION ALL
    SELECT 'Washington University of Science and Technology' UNION ALL
    SELECT 'University of Potomac' UNION ALL
    SELECT 'Curry College' UNION ALL
    SELECT 'Campbellsville University' UNION ALL
    SELECT 'Sullivan University' UNION ALL
    SELECT 'International Technological University' UNION ALL
    SELECT 'Computer Systems Institute' UNION ALL
    SELECT 'St. Francis College' UNION ALL
    SELECT 'American National University'
) AS a
WHERE a.university_name NOT IN (
    SELECT name
    FROM colleges
    WHERE name IN (
        'Westcliff University',
        'Sofia University',
        'California Institute of Advanced Management (CIAM)',
        'Humphreys University',
        'Monroe College',
        'New England College',
        'Harrisburg University of Science and Technology',
        'Goldey‑Beacom College',
        'McDaniel College',
        'National Louis University',
        'Texas Wesleyan University',
        'Indiana Wesleyan University',
        'Ottawa University',
        'North Carolina Wesleyan College',
        'Tennessee Wesleyan University',
        'Saint Peter’s University',
        'Dallas Baptist University',
        'University of the Cumberlands',
        'Trine University',
        'Washington University of Science and Technology',
        'University of Potomac',
        'Curry College',
        'Campbellsville University',
        'Sullivan University',
        'International Technological University',
        'Computer Systems Institute',
        'St. Francis College',
        'American National University'
    )
);
*/


/*Universidade CPT day one */
/*
INSERT INTO colleges (objectid, name) VALUES
(155627, 'Ottawa University'),
(186432, 'Saint Peter’s University'),
(441371, 'Computer Systems Institute'),
(487649, 'California Institute of Advanced Management (CIAM)'),
(130989, 'Goldey‑Beacom College'),
(115773, 'Humphreys University'),
(151801, 'Indiana Wesleyan University'),
(155636, 'Ottawa University'),
(195173, 'St. Francis College'),
(384412, 'University of Potomac'),
(483780, 'Washington University of Science and Technology');
*/


CREATE TABLE college_domains(
objectid VARCHAR(255),
mpowerfinance TINYINT DEFAULT 0,
CPT TINYINT DEFAULT 0
);

INSERT INTO college_domains (objectid, mpowerfinance)  
SELECT objectid, 1 FROM COLLEGES WHERE NAME IN
(

  "A T Still University of Health Sciences",
  "Adelphi University",
  "Albany College of Pharmacy and Health Sciences",
  "Albany Medical College",
  "Allen College",
  "American University",
  "Amherst College",
  "Arcadia University",
  "Arizona State University-Downtown Phoenix",
  "Arizona State University-Polytechnic",
  "Arizona State University-Skysong",
  "Arizona State University-Tempe",
  "Arizona State University-West",
  "Auburn University",
  "Babson College",
  "Ball State University",
  "Barnard College",
  "Barnes-Jewish College Goldfarb School of Nursing",
  "Bates College",
  "Baylor College of Medicine",
  "Baylor University",
  "Bellin College",
  "Bentley University",
  "Biola University",
  "Bon Secours Memorial College of Nursing",
  "Boston College",
  "Boston University",
  "Bowdoin College",
  "Brandeis University",
  "Brigham Young University-Provo",
  "Brock University",
  "Brown University",
  "Bryan College of Health Sciences",
  "Bryn Mawr College",
  "Bucknell University",
  "Butler University",
  "California Institute of Technology",
  "California Polytechnic State University-San Luis Obispo",
  "California State University - Long Beach",
  "Carleton College",
  "Carleton University",
  "Carnegie Mellon University",
  "Careers Unlimited",
  "Case Western Reserve University",
  "Catholic University of America",
  "Centra College of Nursing",
  "Centre College",
  "Chapman University",
  "Chatham University",
  "Citadel Military College of South Carolina",
  "Claremont Graduate University",
  "Claremont McKenna College",
  "Clark University",
  "Clarkson College",
  "Clarkson University",
  "Clemson University",
  "Colby College",
  "Colgate University",
  "College of Charleston",
  "College of the Holy Cross",
  "College of William and Mary",
  "Colorado College",
  "Colorado School of Mines",
  "Colorado State University-Fort Collins",
  "Columbia College of Nursing",
  "Columbia University in the City of New York",
  "Connecticut College",
  "Cornell University",
  "Creighton University",
  "CUNY Bernard M Baruch College",
  "CUNY Hunter College",
  "Dartmouth College",
  "Davidson College",
  "Denison University",
  "Denver College of Nursing",
  "DePaul University",
  "Des Moines University-Osteopathic Medical Center",
  "DeSales University",
  "Dickinson College",
  "Drake University",
  "Drexel University",
  "Duke University",
  "Duquesne University",
  "Eastern Virginia Medical School",
  "Edgewood College",
  "Elon University",
  "Emerson College",
  "Emory University",
  "Fairfield University",
  "Florida State University",
  "Fordham University",
  "Franciscan Missionaries of Our Lady University",
  "Franklin and Marshall College",
  "Frontier Nursing University",
  "George Mason University",
  "George Washington University",
  "Georgetown University",
  "Georgia Institute of Technology-Main Campus",
  "Gettysburg College",
  "Gonzaga University",
  "Grand Valley State University",
  "Grinnell College",
  "Hamilton College",
  "Harvard University",
  "Harvey Mudd College",
  "Haverford College",
  "Hofstra University",
  "Howard University",
  "Hult International Business School",
  "Icahn School of Medicine at Mount Sinai",
  "Illinois Institute of Technology",
  "Illinois State University",
  "Indiana University-Bloomington",
  "Iowa State University",
  "James Madison University",
  "Jefferson (Philadelphia University + Thomas Jefferson University)",
  "Jefferson College of Health Sciences",
  "John Carroll University",
  "Johns Hopkins University",
  "Keck Graduate Institute",
  "Kenyon College",
  "Kettering College",
  "Lafayette College",
  "Lakehead University",
  "Lakeview College of Nursing",
  "Lehigh University",
  "Lesley University",
  "Lethbridge University",
  "Lipscomb University",
  "Loma Linda University",
  "Louisiana State University and Agricultural & Mechanical College",
  "Louisiana State University Health Sciences Center-New Orleans",
  "Loyola Marymount University",
  "Loyola University Chicago",
  "Loyola University Maryland",
  "Loyola University New Orleans",
  "Macalester College",
  "Marquette University",
  "Massachusetts Institute of Technology",
  "McMaster University",
  "MCPHS University",
  "Medical University of South Carolina",
  "Mercer University",
  "MGH Institute of Health Professions",
  "Miami University-Oxford",
  "Michigan State University",
  "Michigan Technological University",
  "Middlebury College",
  "Midwestern University-Downers Grove",
  "Missouri University of Science and Technology",
  "Montclair State University",
  "Mount Carmel College of Nursing",
  "Mount Holyoke College",
  "Nebraska Methodist College of Nursing & Allied Health",
  "New Jersey Institute of Technology",
  "New York Institute of Technology",
  "New York Law School",
  "New York University",
  "North Carolina State University at Raleigh",
  "Northeastern University",
  "Northwestern University",
  "Nova Southeastern University",
  "Oberlin College",
  "Occidental College",
  "Ohio State University-Main Campus",
  "Oregon Health & Science University",
  "Oregon State University",
  "Pace University-New York",
  "Pacific University",
  "Pennsylvania College of Health Sciences",
  "Pennsylvania State University-College of Medicine",
  "Pennsylvania State University-Dickinson Law",
  "Pennsylvania State University-Main Campus",
  "Pennsylvania State University-Penn State Abington",
  "Pennsylvania State University-Penn State Altoona",
  "Pennsylvania State University-Penn State Beaver",
  "Pennsylvania State University-Penn State Berks",
  "Pennsylvania State University-Penn State Brandywine",
  "Pennsylvania State University-Penn State DuBois",
  "Pennsylvania State University-Penn State Erie-Behrend College",
  "Pennsylvania State University-Penn State Fayette- Eberly",
  "Pennsylvania State University-Penn State Great Valley",
  "Pennsylvania State University-Penn State Greater Allegheny",
  "Pennsylvania State University-Penn State Harrisburg",
  "Pennsylvania State University-Penn State Hazleton",
  "Pennsylvania State University-Penn State Lehigh Valley",
  "Pennsylvania State University-Penn State Mont Alto",
  "Pennsylvania State University-Penn State New Kensington",
  "Pennsylvania State University-Penn State Schuylkill",
  "Pennsylvania State University-Penn State Shenango",
  "Pennsylvania State University-Penn State Wilkes-Barre",
  "Pennsylvania State University-Penn State Worthington Scranton",
  "Pennsylvania State University-Penn State York",
  "Pepperdine University",
  "Philadelphia College of Osteopathic Medicine",
  "Phillips School of Nursing at Mount Sinai Beth Israel",
  "Pitzer College",
  "Pomona College",
  "Princeton University",
  "Providence College",
  "Purdue University-Main Campus",
  "Queens University at Kingston",
  "Quinnipiac University",
  "Rensselaer Polytechnic Institute",
  "Research College of Nursing",
  "Resurrection University",
  "Rhodes College",
  "Rice University",
  "Robert Morris University",
  "Rochester Institute of Technology",
  "Rosalind Franklin University of Medicine and Science",
  "Roseman University of Health Sciences",
  "Rowan University",
  "Rush University",
  "Rutgers University-New Brunswick",
  "Rutgers University-Newark",
  "Ryerson University",
  "Saint Francis Medical Center College of Nursing",
  "Saint Francis University",
  "Saint John Fisher College",
  "Saint Louis University",
  "Saint Luke's College of Health Sciences",
  "Samford University",
  "Samuel Merritt University",
  "San Diego State University",
  "Santa Clara University",
  "Scripps College",
  "Seattle Pacific University",
  "Seattle University",
  "Sentara College of Health Sciences",
  "Seton Hall University",
  "Sewanee-The University of the South",
  "Shenandoah University",
  "Simmons College",
  "Simon Fraser University",
  "Skidmore College",
  "Smith College",
  "Soka University of America",
  "South Dakota School of Mines and Technology",
  "South Dakota State University",
  "Southern Methodist University",
  "St Luke's College",
  "St. James School of Medicine - Anguilla",
  "St. Louis College of Pharmacy",
  "Stanford University",
  "Stetson University",
  "Stevens Institute of Technology",
  "Stonehill College",
  "Stony Brook University",
  "Suffolk University",
  "SUNY at Albany",
  "SUNY at Binghamton",
  "SUNY College of Environmental Science and Forestry",
  "SUNY Downstate Medical Center",
  "Swarthmore College",
  "Syracuse University",
  "Teachers College at Columbia University",
  "Temple University",
  "Texas A & M University-College Station",
  "Texas Christian University",
  "Texas Tech University Health Sciences Center",
  "The College of New Jersey",
  "The New School",
  "The University of Alabama",
  "The University of Tennessee-Knoxville",
  "The University of Texas at Austin",
  "The University of Texas at Dallas",
  "The University of Texas Health Science Center at Houston",
  "The University of Texas Health Science Center at San Antonio",
  "The University of Texas MD Anderson Cancer Center",
  "The University of Texas Medical Branch",
  "The University of Virginia's College at Wise",
  "Thomas Aquinas College",
  "Thomas Jefferson University",
  "Thunderbird School of Global Management",
  "Touro University California",
  "Trent University",
  "Trinity College",
  "Trinity University",
  "Tufts University",
  "Tulane University of Louisiana",
  "Union College",
  "Union University",
  "University at Buffalo",
  "University of Alberta",
  "University of Arkansas for Medical Sciences",
  "University of British Columbia",
  "University of Calgary",
  "University of California-Berkeley",
  "University of California-Davis",
  "University of California-Irvine",
  "University of California-Los Angeles",
  "University of California-Merced",
  "University of California-Riverside",
  "University of California-San Diego",
  "University of California-San Francisco",
  "University of California-Santa Barbara",
  "University of California-Santa Cruz",
  "University of Central Florida",
  "University of Chicago",
  "University of Colorado Boulder",
  "University of Colorado Colorado Springs",
  "University of Colorado Denver/Anschutz Medical Campus",
  "University of Connecticut",
  "University of Dayton",
  "University of Delaware",
  "University of Denver",
  "University of Detroit Mercy",
  "University of Florida",
  "University of Georgia",
  "University of Guelph",
  "University of Hartford",
  "University of Hawaii at Manoa",
  "University of Illinois at Chicago",
  "University of Illinois at Urbana-Champaign",
  "University of Iowa",
  "University of Kansas",
  "University of La Verne",
  "University of Maine",
  "University of Manitoba",
  "University of Maryland, Baltimore",
  "University of Maryland-Baltimore County",
  "University of Maryland-College Park",
  "University of Massachusetts-Amherst",
  "University of Massachusetts Medical School Worcester",
  "University of Miami",
  "University of Michigan-Ann Arbor",
  "University of Minnesota-Twin Cities",
  "University of Missouri-Columbia",
  "University of Mount Union",
  "University of Nebraska-Lincoln",
  "University of Nebraska Medical Center",
  "University of New England",
  "University of New Hampshire-Main Campus",
  "University of North Carolina at Chapel Hill",
  "University of North Dakota",
  "University of North Texas Health Science Center",
  "University of Northern Iowa",
  "University of Notre Dame",
  "University of Oklahoma-Norman Campus",
  "University of Oregon",
  "University of Ottawa",
  "University of Pennsylvania",
  "University of Pittsburgh-Pittsburgh Campus",
  "University of Portland",
  "University of Puerto Rico-Medical Sciences",
  "University of Richmond",
  "University of Rochester",
  "University of San Diego",
  "University of San Francisco",
  "University of Scranton",
  "University of South Carolina-Columbia",
  "University of South Florida-Main Campus",
  "University of Southern California",
  "University of St Thomas",
  "University of Texas Southwestern Medical Center",
  "University of the Pacific",
  "University of the Potomac-Washington DC Campus",
  "University of the Sciences",
  "University of Toronto",
  "University of Tulsa",
  "University of Utah",
  "University of Vermont",
  "University of Victoria",
  "University of Virginia-Main Campus",
  "University of Washington-Seattle Campus",
  "University of Waterloo",
  "University of Windsor",
  "University of Wisconsin-Madison",
  "University of Wyoming",
  "Valparaiso University",
  "Vanderbilt University",
  "Vassar College",
  "Villanova University",
  "Virginia Commonwealth University",
  "Virginia Polytechnic Institute and State University",
  "Wake Forest University",
  "Washington and Lee University",
  "Washington State University",
  "Washington University in St Louis",
  "Wellesley College",
  "Wesleyan University",
  "Western University - University of Western Ontario",
  "Western University of Health Sciences",
  "Western Washington University",
  "Whitman College",
  "Whitworth University",
  "Widener University",
  "Williams College",
  "Worcester Polytechnic Institute",
  "Yale University",
  "Yeshiva University",
  "York University",
  "Texas Tech University",
  "University of Potomac"
);

/*Update*/
UPDATE college_domains d
JOIN colleges c ON d.objectid = c.objectid
SET d.CPT = 1
WHERE c.name IN (
    'Westcliff University',
    'Sofia University',
    'California Institute of Advanced Management (CIAM)',
    'Humphreys University',
    'Monroe College',
    'New England College',
    'Harrisburg University of Science and Technology',
    'Goldey‑Beacom College',
    'McDaniel College',
    'National Louis University',
    'Texas Wesleyan University',
    'Indiana Wesleyan University',
    'Ottawa University',
    'North Carolina Wesleyan College',
    'Tennessee Wesleyan University',
    'Saint Peter’s University',
    'Dallas Baptist University',
    'University of the Cumberlands',
    'Trine University',
    'Washington University of Science and Technology',
    'University of Potomac',
    'Curry College',
    'Campbellsville University',
    'Sullivan University',
    'International Technological University',
    'Computer Systems Institute',
    'St. Francis College',
    'American National University'
);


INSERT INTO college_domains (objectid, CPT) 
SELECT c.objectid, 1
 FROM COLLEGES c
 left join college_domains d on c.objectid = d.objectid
 WHERE d.objectid is null
AND NAME IN (
        'Westcliff University',
        'Sofia University',
        'California Institute of Advanced Management (CIAM)',
        'Humphreys University',
        'Monroe College',
        'New England College',
        'Harrisburg University of Science and Technology',
        'Goldey‑Beacom College',
        'McDaniel College',
        'National Louis University',
        'Texas Wesleyan University',
        'Indiana Wesleyan University',
        'Ottawa University',
        'North Carolina Wesleyan College',
        'Tennessee Wesleyan University',
        'Saint Peter’s University',
        'Dallas Baptist University',
        'University of the Cumberlands',
        'Trine University',
        'Washington University of Science and Technology',
        'University of Potomac',
        'Curry College',
        'Campbellsville University',
        'Sullivan University',
        'International Technological University',
        'Computer Systems Institute',
        'St. Francis College',
        'American National University'
);

