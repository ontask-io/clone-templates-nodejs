# Cloning OnTask Templates to a New Group

## OnTask API Sample

### Summary

Using the OnTask API, one or more workflow templates can be exported from a master group and subsequently imported into a newly created group. This allows for provisioning of similar groups based on a known source.

### API Documentation

Specifics about the OnTask API can be found in the official documentation at [docs.ontask.io](https://docs.ontask.io).

The specific endpoints used in this sample are:

- [List Templates](https://docs.ontask.io/?javascript#list)
- [Create New Template](https://docs.ontask.io/?javascript#create-new)
- [Export Template](https://docs.ontask.io/?javascript#export)
- [Import Template](https://docs.ontask.io/?javascript#import)

### Preparation

- Two groups exist in OnTask, `Source Group`, which has the existing workflow template(s) to copy and `Destination Group`, which you would like to clone the template(s) to.
- An API key is generated for each group with at least the `Manage Templates` and `List Templates` permissions. These will be referred to as `sourceToken` and `destToken`.

### Usage

```sh
npm install
node clone :sourceToken :destToken
```
