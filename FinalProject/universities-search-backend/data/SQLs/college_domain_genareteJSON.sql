SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'objectid', objectid,
        'mpowerfinance', mpowerfinance,
        'CPT', CPT,
        'URank', URank,
        'Tuition_and_fees', CAST(REGEXP_REPLACE(Tuition_and_fees, '[^0-9]', '') AS UNSIGNED) 
    )
) AS college_json
FROM college_domains;