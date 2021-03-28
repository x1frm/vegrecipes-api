import { readFile } from 'fs';
import recipesService from '../recipes.service';

describe('Recipes Service', () => {
  it('Saves external recipe from URL to a local file', async () => {
    expect.assertions(2);
    const url = 'https://eda.ru/recepty/osnovnye-blyuda/bulgur-s-tikvoj-52694';

    const id = await recipesService.saveExternalHTML(url);

    expect(id).toHaveLength(12);

    return new Promise((resolve, reject) => {
      readFile(`data/external-recipes/${id}.html`, 'utf-8', (err, data) => {
        if (err) reject(err);
        expect(data).toContain('Булгур с тыквой');
        resolve(0);
      });
    });
  });
});
