-- Insert movies
INSERT INTO public.movies (title, release_year) VALUES
  ('The Shawshank Redemption', 1994),
  ('The Godfather', 1972),
  ('The Godfather: Part II', 1974);

-- Insert actors
INSERT INTO public.actors (name, birth_date) VALUES
  ('Marlon Brando', '1924-04-03'),
  ('Robert De Niro', '1943-08-17'),
  ('Al Pacino', '1940-04-25'),
  ('Morgan Freeman', '1937-06-01'),
  ('Tim Robbins', '1958-10-16'),
  ('Tom Hanks', '1956-07-09');

-- Insert reviews
INSERT INTO public.reviews (movie_id, comment, date) VALUES
  (1, 'One of the best movies ever made.', '2022-01-01'),
  (2, 'A true classic.', '2022-01-02'),
  (3, 'An epic tale of family and power.', '2022-01-03'),
  (1, 'Powerful performances and a compelling story.', '2022-01-04'),
  (2, 'A must-see for any movie fan.', '2022-01-05');

-- Insert movie-actor relationships
INSERT INTO public.movie_actors (movie_id, actor_id) VALUES
  (1, 4),
  (1, 5),
  (2, 1),
  (2, 3),
  (3, 1),
  (3, 2),
  (3, 3);

-- Insert finance data
INSERT INTO public.finance (movie_id, budget, box_office) VALUES
  (1, 25000000, 28341469),
  (2, 6000000, 134821952),
  (3, 13000000, 549766000);