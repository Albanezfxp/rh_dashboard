SELECT
  id,
  nome,
  "dataAdmissao",
  CURRENT_DATE AS data_atual,
  EXTRACT(
    year
    FROM
      age(
        (CURRENT_DATE) :: timestamp without time zone,
        "dataAdmissao"
      )
  ) AS anos,
  EXTRACT(
    MONTH
    FROM
      age(
        (CURRENT_DATE) :: timestamp without time zone,
        "dataAdmissao"
      )
  ) AS meses,
  EXTRACT(
    DAY
    FROM
      age(
        (CURRENT_DATE) :: timestamp without time zone,
        "dataAdmissao"
      )
  ) AS dias
FROM
  funcionarios f;