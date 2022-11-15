function getNumnberOfAccounts(){
  let accounts = getAccountsSources();
  if( !accounts ){
    error("Something went wrong inside getAccountSources(). --getNumnberOfAccounts() ")
  }
  return accounts.length;
}
