## Branching and pull requests

_Feel free to use the source control in VSCode or github.com instead of the terminal_

Before adding and committing changes,

1.  If a branch has not been created for the feature you are currently working on, create a branch.

        git branch <name of feature>

2.  Switch to that branch

        git checkout <branch>

3.  Add and commit relevant files with a message detailing the changes you made. If you are closing an issue, use the words "closes" or "fixes" and #[number of issue] to close it automatically.

        git add <files>
        git commit -m "<commit message>"

4.  Push the branch to the remote repo

        git push -u origin <branch>

5.  Go to github.com. There should be a message at the top and a green button that says "Compare & pull request". Click on that button.
6.  Make sure that base is the branch you are merging into and the one you are comparing is the branch that you have been working on.
7.  Add labels, use @mention to ask someone to review the pull request, or link projects or issues if necessary.
8.  Create pull request.
9.  Continue making commits to the branch if you still need to work on the feature and the pull request will keep track of them.
10. Fix any merge conflicts.
11. Once you are finished with the feature and there are no merge conflicts, merge pull request.
12. Close pull request and delete branch if it is safe to do so.

## Resources

[Branching and pull requests from github.com](https://guides.github.com/activities/hello-world/)
