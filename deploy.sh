#! /bin/sh
git checkout -b gh-temp
# gulp build
# bower install
echo '!public/lib' >> .gitignore
git add -A
git commit -m "lib for gh-pages"
git subtree split --prefix public -b gh-pages
git push origin gh-pages --force
git checkout master
git branch -D gh-temp
git branch -D gh-pages
