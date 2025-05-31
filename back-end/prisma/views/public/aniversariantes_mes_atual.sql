SELECT
  id,
  nome,
  data_de_nascimento,
  "substring"(data_de_nascimento, 9, 2) AS dia_aniversario,
  "substring"(data_de_nascimento, 6, 2) AS mes_aniversario,
  date_part(
    'year' :: text,
    age(
      (CURRENT_DATE) :: timestamp WITH time zone,
      (to_date(data_de_nascimento, 'YYYY-MM-DD' :: text)) :: timestamp WITH time zone
    )
  ) AS idade
FROM
  funcionarios
WHERE
  (
    "substring"(data_de_nascimento, 6, 2) = to_char(
      (CURRENT_DATE) :: timestamp WITH time zone,
      'MM' :: text
    )
  )
ORDER BY
  ("substring"(data_de_nascimento, 9, 2)) :: integer;