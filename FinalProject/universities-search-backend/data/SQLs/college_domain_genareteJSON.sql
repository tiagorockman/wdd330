SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'objectid', objectid,
        'mpowerfinance', mpowerfinance,
        'CPT', CPT,
        'URank', URank,
        'Tuition_and_fees', Tuition_and_fees
    )
) AS college_json
FROM college_domains;