export class CreateCommentDTO {
  public text!: string;
  public rating!: number;
  public publicationDate!: Date;
  public userId!: string;
  public offerId!: string;
}
//TODO: I use in not entity types for ref id type string, when in reality it should probably be somethig like a ref to entity id.
// What is the rule regards such cases?
// I have the same in offer, where I use string for user ref
